import Image from "next/image";

const CREDS = [
  "Graduado em Educação Física",
  "Especializações em Treinamento Funcional, Cross Training, Avaliação Física, Nutrição Esportiva e Performance Humana",
];

export function Credibility() {
  return (
    <section className="section cut-line" id="metodo">
      <div className="wrap">
        <div className="coach" data-reveal>
          <figure className="coach-photo field-arc">
            <Image
              src="/b/images/hq/erivelton.jpg"
              alt="Erivelton Fernandes, preparador físico"
              width={900}
              height={1200}
              quality={90}
              sizes="(max-width: 900px) 70vw, 280px"
            />
          </figure>
          <div>
            <p className="eyebrow">
              <span className="min">60&apos;</span> · Quem assina
            </p>
            <h2 className="display display-md">
              Erivelton
              <br />
              Fernandes.
            </h2>
            <p className="coach-role">
              Preparador físico · CREF 012996-G/PE · Método EF Performance
            </p>
            <p className="lead">
              Mais de 5 anos montando protocolos de força e potência pra
              futebol, combate e alto rendimento. Foi ele quem conduziu a
              preparação do Berô na volta do quadro pulmonar.
            </p>
            <ul className="coach-creds">
              {CREDS.map((cred) => (
                <li key={cred}>{cred}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
