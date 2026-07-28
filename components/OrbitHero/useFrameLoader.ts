import { useEffect, useRef } from "react";
import { framePath, type FrameSet } from "./frames";

/**
 * Carrega os frames em camadas de stride (8 → 4 → 2 → 1) com concorrência
 * limitada. Enquanto o set não está completo, getNearestFrame devolve o
 * frame carregado mais próximo do índice alvo — a órbita degrada para
 * "mais grossa", nunca trava.
 *
 * Mantém apenas HTMLImageElements (bytes comprimidos); o decode fica por
 * conta do cache do browser, aquecido numa janela de ±12 frames.
 */
export function useFrameLoader(
  set: FrameSet | null,
  onProgress?: (loaded: number, total: number) => void
) {
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedRef = useRef<Set<number>>(new Set());
  const abortRef = useRef(false);

  useEffect(() => {
    if (!set) return;
    abortRef.current = false;
    const images = imagesRef.current;
    const loaded = loadedRef.current;
    images.clear();
    loaded.clear();

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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  const getNearestFrame = (target: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    const exact = images.get(target);
    if (exact) return exact;
    // procura o carregado mais próximo (janela crescente)
    for (let delta = 1; delta < 64; delta++) {
      const below = images.get(target - delta);
      if (below) return below;
      const above = images.get(target + delta);
      if (above) return above;
    }
    return images.get(0) ?? null;
  };

  /**
   * Aquecimento de decode ao redor do frame atual, com viés na direção do
   * movimento. Passo 1 obrigatório: qualquer frame pulado vira decode
   * síncrono no drawImage (hitch de 8–16 ms no meio do scroll).
   */
  const warmDecode = (center: number, direction = 1) => {
    const images = imagesRef.current;
    const ahead = direction >= 0 ? 10 : 4;
    const behind = direction >= 0 ? 4 : 10;
    for (let d = -behind; d <= ahead; d++) {
      const img = images.get(center + d);
      if (img && img.decode) img.decode().catch(() => {});
    }
  };

  return { getNearestFrame, warmDecode, loadedRef };
}
