import Image from "next/image";
import { CtaButton } from "./CtaButton";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="wrap final-cta-inner reveal">
        <Image
          src="/images/logo-base-horiz-branco-transparent.png"
          alt="Base Performance"
          width={1080}
          height={484}
          className="final-logo"
        />
        <h2 className="display h2">Reconstrua sua base.</h2>
        <p className="lead">
          Depois vem a performance. Sem atalho. Com protocolo.
        </p>
        <CtaButton label="Quero reconstruir minha base agora" />
        <p className="cta-note">R$ 59,90 · Acesso imediato · Garantia 7 dias</p>
      </div>
    </section>
  );
}
