"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CtaButton } from "../CtaButton";
import { FRAME_SETS, type FrameSet } from "./frames";
import { useFrameLoader } from "./useFrameLoader";

function track(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") fbq("trackCustom", event, params ?? {});
}

/**
 * Hero com órbita 360° scroll-driven ("o atleta como monumento").
 *
 * Pista pinned de 400vh (350vh mobile); o progresso do scroll indexa a
 * sequência de frames num <canvas> 2D. Texto em 4 beats via data-stage.
 *
 * Estado CSS default (SSG, sem JS) = hero estático completo sobre o poster.
 * O JS adiciona .orbit-active e assume o controle.
 *
 * Fallbacks estáticos: prefers-reduced-motion, saveData/2g,
 * deviceMemory <= 2 (APIs de device não existem no iOS — iPhone baixa o
 * set mobile completo, ~2,4 MB, decisão aceita).
 */
export function OrbitHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const [frameSet, setFrameSet] = useState<FrameSet | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const progressRef = useRef({ raw: 0, smooth: 0, frame: -1, stage: -1, dir: 1 });
  const firedRef = useRef({ start: false, half: false, complete: false });

  const { getFrame, warm } = useFrameLoader(
    frameSet,
    (loadedCount, total) => {
      if (barRef.current) {
        barRef.current.style.width = `${(loadedCount / total) * 100}%`;
      }
      if (loadedCount === total && barRef.current) {
        barRef.current.style.opacity = "0";
      }
    }
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const slow =
      nav.connection?.saveData === true ||
      nav.connection?.effectiveType === "2g" ||
      nav.connection?.effectiveType === "slow-2g";
    const weak = (nav.deviceMemory ?? 8) <= 2;

    if (reduced || slow || weak) return; // fica no hero estático

    const section = sectionRef.current;
    if (!section) return;
    section.classList.add("orbit-active");

    // Escolha do set + reset se o breakpoint cruzar (rotação de tablet etc.)
    const mq = window.matchMedia("(max-width: 640px)");
    const pick = () => setFrameSet(mq.matches ? FRAME_SETS.m : FRAME_SETS.d);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  /* Driver: scroll passivo → rAF → lerp → drawImage + data-stage */
  useEffect(() => {
    if (!frameSet) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let scheduled = false;
    let running = true;
    let lastTs = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const sticky = stickyRef.current;
      if (!sticky) return;
      // Canvas nunca maior que o frame de origem: acima disso o blit só
      // encarece (a CSS estica o canvas na GPU sem perda visível)
      const cap = Math.min(
        frameSet.width / Math.max(sticky.clientWidth, 1),
        frameSet.height / Math.max(sticky.clientHeight, 1)
      );
      const scale = Math.min(dpr, cap);
      canvas.width = Math.round(sticky.clientWidth * scale);
      canvas.height = Math.round(sticky.clientHeight * scale);
      progressRef.current.frame = -1; // força redraw
      drawCurrent();
    };

    const drawCover = (img: HTMLImageElement | ImageBitmap) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img instanceof HTMLImageElement ? img.naturalWidth : img.width;
      const ih = img instanceof HTMLImageElement ? img.naturalHeight : img.height;
      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, cw, ch);
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const drawCurrent = () => {
      const p = progressRef.current;
      const target = Math.round(p.smooth * (frameSet.count - 1));
      const img = getFrame(target);
      if (img) {
        drawCover(img);
        if (!canvasReady) setCanvasReady(true);
        warm(target, p.dir);
      }
    };

    const tick = (ts: number) => {
      scheduled = false;
      if (!running) return;
      const dt = lastTs ? Math.min(ts - lastTs, 64) : 16.7;
      lastTs = ts;
      const p = progressRef.current;
      // Suavização independente de frame-rate (τ = 90 ms): mesma resposta em
      // 60 e 120 Hz, segue o dedo sem efeito elástico
      const alpha = 1 - Math.exp(-dt / 90);
      p.smooth += (p.raw - p.smooth) * alpha;
      if (Math.abs(p.raw - p.smooth) < 0.0005) p.smooth = p.raw;

      const frame = Math.round(p.smooth * (frameSet.count - 1));
      if (frame !== p.frame) {
        p.frame = frame;
        drawCurrent();
      }

      // beats do storyboard com LACUNAS entre eles — o texto some, o atleta
      // gira sozinho, e o beat seguinte "chega" (ausência → chegada é o que
      // torna a troca perceptível)
      const r = p.raw;
      const stage =
        r < 0.2 ? 0 : r < 0.27 ? -1 : r < 0.45 ? 1 : r < 0.52 ? -1 : r < 0.7 ? 2 : r < 0.77 ? -1 : 3;
      if (stage !== p.stage) {
        p.stage = stage;
        sectionRef.current?.setAttribute(
          "data-stage",
          stage === -1 ? "gap" : String(stage)
        );
      }

      // fade pra preto no encerramento (96% → 100%) — cortina antes da Prova
      if (fadeRef.current) {
        const fade = Math.min(Math.max((r - 0.96) / 0.04, 0), 1);
        fadeRef.current.style.opacity = String(fade);
      }

      // tracking de engajamento (disparo único)
      const fired = firedRef.current;
      if (!fired.start && p.raw > 0.05) {
        fired.start = true;
        track("OrbitStart");
      }
      if (!fired.half && p.raw >= 0.5) {
        fired.half = true;
        track("OrbitHalf");
      }
      if (!fired.complete && p.raw >= 0.95) {
        fired.complete = true;
        track("OrbitComplete");
      }

      if (p.smooth !== p.raw && !scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const trackLength = section.offsetHeight - window.innerHeight;
      const p = progressRef.current;
      const raw = Math.min(Math.max(-rect.top / Math.max(trackLength, 1), 0), 1);
      if (raw !== p.raw) p.dir = raw > p.raw ? 1 : -1;
      p.raw = raw;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(resize, 150);
    });
    let resizeDebounce: ReturnType<typeof setTimeout>;

    window.addEventListener("scroll", onScroll, { passive: true });
    if (stickyRef.current) resizeObserver.observe(stickyRef.current);
    resize();
    onScroll();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      clearTimeout(resizeDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSet]);

  return (
    <section
      ref={sectionRef}
      className="orbit-hero vignette"
      id="topo"
      data-stage="0"
    >
      <div ref={stickyRef} className="orbit-sticky floodlight">
        {/* Poster = LCP. O canvas assume por cima quando pronto. */}
        <Image
          src="/orbit/poster-d.webp"
          alt="Berô Paraíba, hexacampeão do X1 Brazil, sob o refletor"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="orbit-poster"
        />
        <canvas
          ref={canvasRef}
          className={`orbit-canvas${canvasReady ? " is-ready" : ""}`}
          aria-hidden="true"
        />

        {/* Cortina de encerramento (96–100% do scroll) */}
        <div ref={fadeRef} className="orbit-endfade" aria-hidden="true" />

        {/* Barra de carregamento — placar */}
        <div className="orbit-loader" aria-hidden="true">
          <div ref={barRef} className="orbit-loader-bar" />
        </div>

        {/* Overlays de texto — 4 beats */}
        <div className="orbit-content">
          <p className="eyebrow orbit-eyebrow">
            <span className="min">0&apos;</span> · Berô Paraíba · Hexacampeão do
            X1 Brazil
          </p>

          <div className="orbit-beat" data-beat="0">
            <h1 className="display display-xl">
              Reconstruído
              <br />
              em 6 semanas.
            </h1>
          </div>

          <div className="orbit-beat" data-beat="1">
            <p className="display display-lg" role="heading" aria-level={2}>
              Depois de um
              <br />
              quadro pulmonar.
            </p>
            <p className="micro orbit-micro">
              Ele voltou do afastamento e reconstruiu o corpo treino a treino.
            </p>
          </div>

          <div className="orbit-beat" data-beat="2">
            <p className="display display-lg" role="heading" aria-level={2}>
              Não foi talento.
              <br />
              Foi protocolo.
            </p>
            <p className="micro orbit-micro">
              2 fases. Progressão definida. Nenhum treino improvisado.
            </p>
          </div>

          <div className="orbit-beat" data-beat="3">
            <p className="display display-lg" role="heading" aria-level={2}>
              Agora,
              <br />a sua base.
            </p>
            <p className="micro orbit-micro">
              O mesmo protocolo, aberto. 6 semanas. 3 treinos por semana.
            </p>
            <div className="hero-actions">
              <CtaButton
                ctaId="hero"
                label="Começar minha base · R$ 59,90"
                labelShort="Começar · R$ 59,90"
              />
              <a className="text-link" href="#prova">
                Ver a transformação do Berô ↓
              </a>
            </div>
          </div>

          <p className="orbit-cue mono-caption" aria-hidden="true">
            Role ↓
          </p>
        </div>
      </div>
    </section>
  );
}
