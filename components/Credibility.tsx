import Image from "next/image";

export function Credibility() {
  return (
    <section className="section" id="metodo">
      <div className="wrap coach reveal">
        <div className="coach-photo">
          <Image
            src="/images/hq/erivelton.jpg"
            alt="Erivelton Fernandes, preparador físico"
            width={900}
            height={1200}
            quality={90}
            sizes="(max-width: 900px) 70vw, 300px"
            className="coach-photo-img"
          />
        </div>
        <div className="coach-copy">
          <h2 className="display h2">Erivelton Fernandes</h2>
          <p className="coach-role">
            Preparador físico e personal trainer · CREF 012996-G/PE
          </p>
          <p className="lead">
            Especializado em performance esportiva e preparação física para
            futebol, combate e alto rendimento. Idealizador do Método EF
            Performance, com mais de 5 anos montando protocolos de força e
            potência.
          </p>
          <ul className="coach-creds">
            <li>Graduado em Educação Física</li>
            <li>
              Especializações em Treinamento Funcional, Cross Training,
              Avaliação Física, Nutrição Esportiva e Performance Humana
            </li>
            <li>
              Referências técnicas: Mike Boyle, Gray Cook, Tudor Bompa, EXOS,
              NSCA, FIFA 11+
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
