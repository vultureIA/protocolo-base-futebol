import Image from "next/image";
import { INSTAGRAM_BERO_URL, INSTAGRAM_PROOF_URL } from "@/lib/constants";

const gallery = [
  {
    src: "/images/hq/bero-antes.webp",
    alt: "Berô no início da recuperação",
    label: "Antes",
  },
  {
    src: "/images/hq/bero-depois-frente.webp",
    alt: "Berô após o protocolo, frente",
    label: "Depois",
  },
  {
    src: "/images/hq/bero-depois-perfil.webp",
    alt: "Berô após o protocolo, perfil",
    label: "Perfil",
  },
  {
    src: "/images/hq/bero-depois-costas.webp",
    alt: "Berô após o protocolo, costas",
    label: "Costas",
  },
];

export function Proof() {
  return (
    <section className="section proof-section" id="prova">
      <div className="wrap stack-lg">
        <div className="section-intro reveal">
          <p className="eyebrow">Case · @beroparaiba</p>
          <h2 className="display h2">A base reconstruída.</h2>
          <p className="lead">
            Retorno após quadro pulmonar. +12 kg. Mais força, estabilidade e
            potência. Sem atalho.
          </p>
        </div>

        <figure className="proof-feature reveal">
          <Image
            src="/images/hq/bero-antes-depois.webp"
            alt="Comparativo antes e depois do Berô Paraíba"
            width={2000}
            height={2000}
            quality={92}
            sizes="(max-width: 900px) 94vw, 1000px"
          />
        </figure>

        <div className="proof-stats reveal">
          <div>
            <strong>+12 kg</strong>
            <span>de evolução</span>
          </div>
          <div>
            <strong>74,5 kg</strong>
            <span>peso atual</span>
          </div>
          <div>
            <strong>6 semanas</strong>
            <span>de protocolo</span>
          </div>
        </div>

        <div className="proof-gallery reveal">
          {gallery.map((item) => (
            <figure className="proof-gallery-item" key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                width={1000}
                height={1400}
                quality={90}
                sizes="(max-width: 900px) 70vw, 240px"
              />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="proof-links reveal">
          <a href={INSTAGRAM_PROOF_URL} target="_blank" rel="noopener noreferrer">
            Post da transformação
          </a>
          <a href={INSTAGRAM_BERO_URL} target="_blank" rel="noopener noreferrer">
            @beroparaiba
          </a>
        </div>
      </div>
    </section>
  );
}
