"use client";

import { useEffect, useRef } from "react";
import { AB_VARIANT } from "@/lib/constants";
import { CtaButton } from "../CtaButton";

function track(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function")
    fbq("trackCustom", event, { ab_variant: AB_VARIANT, ...params });
}

/**
 * Hero da variante B — sem vídeo, por decisão do teste: a área do vídeo
 * fica preta (fundo do floodlight), só com os beats de texto.
 *
 * Mantém a pista pinned de 400vh (350vh mobile) e os 4 beats via
 * data-stage, agora dirigidos direto pelo scroll (sem canvas/frames).
 *
 * Estado CSS default (SSG, sem JS) = hero estático completo.
 * O JS adiciona .orbit-active e assume o controle.
 */
export function OrbitHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(-2);
  const firedRef = useRef({ start: false, half: false, complete: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (reduced || !section) return; // fica no hero estático

    section.classList.add("orbit-active");

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const trackLength = section.offsetHeight - window.innerHeight;
      const r = Math.min(Math.max(-rect.top / Math.max(trackLength, 1), 0), 1);

      // beats do storyboard com LACUNAS entre eles — o texto some e o beat
      // seguinte "chega" (ausência → chegada é o que torna a troca perceptível)
      const stage =
        r < 0.2 ? 0 : r < 0.27 ? -1 : r < 0.45 ? 1 : r < 0.52 ? -1 : r < 0.7 ? 2 : r < 0.77 ? -1 : 3;
      if (stage !== stageRef.current) {
        stageRef.current = stage;
        section.setAttribute("data-stage", stage === -1 ? "gap" : String(stage));
      }

      // fade pra preto no encerramento (96% → 100%) — cortina antes da Prova
      if (fadeRef.current) {
        const fade = Math.min(Math.max((r - 0.96) / 0.04, 0), 1);
        fadeRef.current.style.opacity = String(fade);
      }

      // tracking de engajamento (disparo único)
      const fired = firedRef.current;
      if (!fired.start && r > 0.05) {
        fired.start = true;
        track("OrbitStart");
      }
      if (!fired.half && r >= 0.5) {
        fired.half = true;
        track("OrbitHalf");
      }
      if (!fired.complete && r >= 0.95) {
        fired.complete = true;
        track("OrbitComplete");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="orbit-hero vignette"
      id="topo"
      data-stage="0"
    >
      <div className="orbit-sticky floodlight">
        {/* Cortina de encerramento (96–100% do scroll) */}
        <div ref={fadeRef} className="orbit-endfade" aria-hidden="true" />

        {/* Overlays de texto — 4 beats */}
        <div className="orbit-content">
          <p className="eyebrow orbit-eyebrow">
            <span className="min">0&apos;</span> · Berô Paraíba · Hexacampeão do
            X1 Brazil
          </p>

          <div className="orbit-beat" data-beat="0">
            <h1 className="display display-xl">
              6 semanas.
              <br />
              Resultado visível.
            </h1>
          </div>

          <div className="orbit-beat" data-beat="1">
            <p className="display display-lg" role="heading" aria-level={2}>
              Sem montar treino.
              <br />
              Sem adivinhar.
            </p>
            <p className="micro orbit-micro">
              Você recebe tudo pronto: é abrir o treino do dia e executar. 3x
              por semana.
            </p>
          </div>

          <div className="orbit-beat" data-beat="2">
            <p className="display display-lg" role="heading" aria-level={2}>
              O atalho é copiar
              <br />
              quem já conseguiu.
            </p>
            <p className="micro orbit-micro">
              O mesmo protocolo que reconstruiu o Berô depois de um quadro
              pulmonar.
            </p>
          </div>

          <div className="orbit-beat" data-beat="3">
            <p className="display display-lg" role="heading" aria-level={2}>
              Começa hoje.
              <br />
              Sente a diferença.
            </p>
            <p className="micro orbit-micro">
              6 semanas. 3 treinos por semana. Garantia de 7 dias — risco zero.
            </p>
            <div className="hero-actions">
              <CtaButton
                ctaId="hero"
                label="Quero resultado rápido · R$ 59,90"
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
