import { CtaButton } from "../CtaButton";

/**
 * Hero da variante B — estático e imediato, por decisão do teste: sem vídeo
 * (a área fica preta, só o refletor do floodlight) e sem a pista pinned de
 * scroll do redesign. Uma tela, headline agressiva, CTA na hora.
 */
export function OrbitHero() {
  return (
    <section className="orbit-hero vignette" id="topo">
      <div className="orbit-sticky floodlight">
        <div className="orbit-content">
          <p className="eyebrow orbit-eyebrow">
            <span className="min">0&apos;</span> · Berô Paraíba · Hexacampeão do
            X1 Brazil
          </p>

          <h1 className="display display-xl">
            6 semanas.
            <br />
            Resultado visível.
          </h1>

          <p className="micro orbit-micro">
            Treino pronto, 3 vezes por semana. Sem montar nada, sem adivinhar —
            é abrir e executar. Garantia de 7 dias.
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
      </div>
    </section>
  );
}
