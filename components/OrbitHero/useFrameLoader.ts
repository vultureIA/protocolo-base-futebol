import { useEffect, useRef } from "react";
import { framePath, type FrameSet } from "./frames";

/**
 * Carrega os frames em camadas de stride (8 → 4 → 2 → 1) com concorrência
 * limitada. Enquanto o set não está completo, getFrame devolve o frame
 * carregado mais próximo do índice alvo — a órbita degrada para "mais
 * grossa", nunca trava.
 *
 * Duas camadas de cache:
 * - HTMLImageElements (bytes comprimidos) do set inteiro;
 * - janela deslizante de ImageBitmaps (pixels decodificados, prontos pra
 *   blit) ao redor do frame atual. Decode garantido fora do main thread,
 *   sem depender do cache de decode do browser — que evicta sob pressão
 *   de memória e devolve o hitch no meio do scroll.
 */

const AHEAD = 10; // bitmaps à frente do movimento
const BEHIND = 4; // bitmaps atrás
const EVICT_RADIUS = 20; // fora disso, close() libera a memória

export function useFrameLoader(
  set: FrameSet | null,
  onProgress?: (loaded: number, total: number) => void
) {
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedRef = useRef<Set<number>>(new Set());
  const bitmapsRef = useRef<Map<number, ImageBitmap>>(new Map());
  const pendingRef = useRef<Set<number>>(new Set());
  const centerRef = useRef(0);
  const abortRef = useRef(false);

  useEffect(() => {
    if (!set) return;
    abortRef.current = false;
    const images = imagesRef.current;
    const loaded = loadedRef.current;
    const bitmaps = bitmapsRef.current;
    images.clear();
    loaded.clear();
    bitmaps.forEach((bmp) => bmp.close());
    bitmaps.clear();
    pendingRef.current.clear();

    const tiers = [8, 4, 2, 1];
    const queue: number[] = [];
    const seen = new Set<number>();
    for (const stride of tiers) {
      for (let i = 0; i < set.count; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          queue.push(i);
        }
      }
    }
    // garante o último frame (loop fecha nele)
    if (!seen.has(set.count - 1)) queue.push(set.count - 1);

    let cursor = 0;
    let active = 0;
    const CONCURRENCY = 8;

    const pump = () => {
      if (abortRef.current) return;
      while (active < CONCURRENCY && cursor < queue.length) {
        const index = queue[cursor++];
        active++;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          active--;
          images.set(index, img);
          loaded.add(index);
          onProgress?.(loaded.size, set.count);
          pump();
        };
        img.onerror = () => {
          active--;
          pump();
        };
        img.src = framePath(set, index);
      }
    };

    // primeiro tier imediato; o resto quando o main thread respirar
    pump();

    return () => {
      abortRef.current = true;
      bitmaps.forEach((bmp) => bmp.close());
      bitmaps.clear();
      pendingRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  /** Melhor fonte pro índice alvo: bitmap decodificado > imagem > vizinho. */
  const getFrame = (target: number): ImageBitmap | HTMLImageElement | null => {
    const bmp = bitmapsRef.current.get(target);
    if (bmp) return bmp;
    const images = imagesRef.current;
    const exact = images.get(target);
    if (exact) return exact;
    // procura o carregado mais próximo (janela crescente)
    for (let delta = 1; delta < 64; delta++) {
      const below = images.get(target - delta);
      if (below) return bitmapsRef.current.get(target - delta) ?? below;
      const above = images.get(target + delta);
      if (above) return bitmapsRef.current.get(target + delta) ?? above;
    }
    return images.get(0) ?? null;
  };

  /**
   * Mantém a janela de bitmaps ao redor do frame atual com viés na direção
   * do movimento; evicta os que ficaram longe. Passo 1 obrigatório:
   * qualquer frame pulado viraria decode síncrono no drawImage.
   */
  const warm = (center: number, direction = 1) => {
    centerRef.current = center;
    const images = imagesRef.current;

    if (typeof createImageBitmap !== "function") {
      // browser antigo: aquece o cache de decode e segue o jogo
      for (let d = -BEHIND; d <= AHEAD; d++) {
        const img = images.get(center + (direction >= 0 ? d : -d));
        if (img && img.decode) img.decode().catch(() => {});
      }
      return;
    }

    const bitmaps = bitmapsRef.current;
    const pending = pendingRef.current;
    const lo = center - (direction >= 0 ? BEHIND : AHEAD);
    const hi = center + (direction >= 0 ? AHEAD : BEHIND);
    for (let i = lo; i <= hi; i++) {
      if (i < 0 || bitmaps.has(i) || pending.has(i)) continue;
      const img = images.get(i);
      if (!img) continue;
      pending.add(i);
      createImageBitmap(img)
        .then((bmp) => {
          pending.delete(i);
          if (abortRef.current || Math.abs(i - centerRef.current) > EVICT_RADIUS) {
            bmp.close();
            return;
          }
          bitmaps.set(i, bmp);
        })
        .catch(() => pending.delete(i));
    }
    bitmaps.forEach((bmp, i) => {
      if (Math.abs(i - center) > EVICT_RADIUS) {
        bitmaps.delete(i);
        bmp.close();
      }
    });
  };

  return { getFrame, warm, loadedRef };
}
