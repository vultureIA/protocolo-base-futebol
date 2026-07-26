import Image from "next/image";
import { CtaButton } from "./CtaButton";

/**
 * Hero estático — variante provisória e fallback definitivo do OrbitHero
 * (reduced-motion / sem JS / save-data). O poster será substituído pelo
 * still âncora da órbita quando a produção (Fase 2) for aprovada.
 */
export function Hero() {
  return (
    <section className="hero-static vignette" id="topo">
      <Image
        src="/images/hq/bero-depois-frente.webp"
        alt="Berô Paraíba, hexacampeão do X1 Brazil"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-static-img"
      />
      <div className="hero-static-shade" aria-hidden="true" />
      <div className="hero-static-inner">
        <p className="eyebrow">
          <span className="min">0&apos;</span> · Berô Paraíba · Hexacampeão do X1
          Brazil
        </p>
        <h1 className="display display-xl">
          Reconstruído
          <br />
          em 6 semanas.
        </h1>
        <p className="lead">
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
    </section>
  );
}
