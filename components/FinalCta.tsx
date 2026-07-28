import Image from "next/image";
import { CtaButton } from "./CtaButton";

export function FinalCta() {
  return (
    <section className="section inverted field-circle-big final-cta">
      <div className="wrap" data-reveal>
        <Image
          src="/b/images/logo-base-horiz-branco-transparent.png"
          alt="Base Performance"
          width={1080}
          height={484}
          className="final-logo"
        />
        <p className="eyebrow">
          <span className="min">90&apos;+</span> · Acréscimos
        </p>
        <h2 className="display display-lg">
          Treino pronto.
          <br />
          Resultado rápido.
          <br />
          Decisão sua.
        </h2>
        <p className="lead">
          6 semanas. 18 treinos prontos. Zero adivinhação. O mesmo protocolo que
          reconstruiu o Berô.
        </p>
        <CtaButton
          ctaId="final"
          label="Quero resultado rápido · R$ 59,90"
          labelShort="Começar · R$ 59,90"
        />
        <p className="cta-note">
          Acesso imediato · Garantia 7 dias · Pagamento único
        </p>
      </div>
    </section>
  );
}
