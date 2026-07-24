import Image from "next/image";
import { CtaButton } from "./CtaButton";

export function Hero() {
  return (
    <section className="hero-cinematic" id="topo">
      <div className="hero-cinematic-bg" aria-hidden="true">
        <Image
          src="/images/hq/bero-transformacao.webp"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="hero-cinematic-img"
        />
        <div className="hero-cinematic-shade" />
      </div>

      <div className="wrap hero-cinematic-inner">
        <div className="hero-copy rise">
          <Image
            src="/images/logo-base-horiz-branco-transparent.png"
            alt="Base Performance"
            width={1080}
            height={484}
            priority
            className="hero-logo"
          />
          <h1 className="display h1">
            Toda grande performance começa pela base.
          </h1>
          <p className="lead hero-lead">
            Protocolo de 6 semanas usado na recuperação do Berô Paraíba,
            hexacampeão do X1 Brazil.
          </p>
          <div className="hero-actions rise-delay-1">
            <CtaButton label="Quero reconstruir minha base" />
            <a className="text-link" href="#prova">
              Ver a transformação
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
