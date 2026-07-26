import Image from "next/image";
import { INSTAGRAM_BERO_URL, INSTAGRAM_PROOF_URL } from "@/lib/constants";
import { CtaButton } from "./CtaButton";

const STATS = [
  { value: "+12", suffix: " KG", label: "de evolução" },
  { value: "74,5", suffix: " KG", label: "peso atual" },
  { value: "6", suffix: " SEMANAS", label: "de protocolo" },
  { value: "18", suffix: " TREINOS", label: "3 por semana" },
];

const GALLERY = [
  {
    src: "/images/hq/bero-antes.webp",
    alt: "Berô antes do protocolo",
    caption: "Semana 0 — ponto de partida",
  },
  {
    src: "/images/hq/bero-depois-frente.webp",
    alt: "Berô depois do protocolo, de frente",
    caption: "Semana 6 — 74,5 kg",
  },
  {
    src: "/images/hq/bero-depois-perfil.webp",
    alt: "Berô depois do protocolo, de perfil",
    caption: "Perfil — semana 6",
  },
  {
    src: "/images/hq/bero-depois-costas.webp",
    alt: "Berô depois do protocolo, de costas",
    caption: "Costas — semana 6",
  },
];

export function Proof() {
  return (
    <section className="section bg-surface-2 double-border" id="prova">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">
            <span className="min">12&apos;</span> — O case · @beroparaiba
          </p>
          <h2 className="display display-lg">
            O placar
            <br />
            do Berô.
          </h2>
          <p className="lead">
            Retorno depois de um quadro pulmonar. Seis semanas de protocolo, três
            treinos por semana. O resultado ficou no corpo — e está documentado.
          </p>
        </div>

        <div className="stat-grid" data-reveal>
          {STATS.map((stat) => (
            <div className="stat-tile" key={stat.label}>
              <strong data-count={stat.value} data-suffix={stat.suffix}>
                {stat.value}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="proof-disclaimer">
          Resultado individual do Berô, documentado no Instagram e usado com
          autorização. A resposta ao treino varia de pessoa pra pessoa — o
          protocolo é o mesmo.
        </p>

        <div className="proof-feature" data-reveal>
          <Image
            src="/images/hq/bero-antes-depois.webp"
            alt="Antes e depois do Berô Paraíba em 6 semanas de protocolo"
            width={2000}
            height={2000}
            quality={92}
            sizes="(max-width: 900px) 94vw, 1000px"
          />
        </div>

        <div className="proof-gallery" data-reveal>
          {GALLERY.map((item) => (
            <figure className="proof-gallery-item" key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                width={1000}
                height={1400}
                quality={90}
                sizes="(max-width: 900px) 62vw, 240px"
              />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="proof-links">
          <a
            className="text-link"
            href={INSTAGRAM_PROOF_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o post da transformação
          </a>
          <a
            className="text-link"
            href={INSTAGRAM_BERO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            @beroparaiba
          </a>
        </div>

        <div className="proof-cta">
          <CtaButton ctaId="prova" label="Quero esse protocolo" />
          <p className="cta-note">
            R$ 59,90 · pagamento único · garantia 7 dias
          </p>
        </div>
      </div>
    </section>
  );
}
