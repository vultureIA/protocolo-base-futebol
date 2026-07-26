const SYMPTOMS = [
  "Acelera e a potência não vem.",
  "Freia e o joelho reclama.",
  "Muda de direção e perde a firmeza.",
  "Volta de um tempo parado com medo do primeiro sprint.",
];

export function PainDesire() {
  return (
    <>
      <section className="section bg-blackout cut-line field-sideline-left" id="dor">
        <div className="wrap" data-reveal>
          <p className="eyebrow">
            <span className="min">27&apos;</span> · Você em campo
          </p>
          <h2 className="display display-lg">
            O jogo cobra.
            <br />O corpo nega.
          </h2>
          <p className="lead">
            O primeiro sprint vem e a perna hesita. A dividida chega e você
            recua. Quase nunca é falta de vontade. É falta de estrutura. E
            estrutura não se improvisa no domingo.
          </p>
          <ul className="symptom-list">
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tick-divider floodlight-soft" id="desejo">
        <div className="wrap" data-reveal>
          <p className="eyebrow">
            <span className="min">38&apos;</span> · O outro lado
          </p>
          <h2 className="display display-lg">
            Entrar forte.
            <br />
            Sair inteiro.
          </h2>
          <p className="lead">
            Acelerar sem calcular. Frear seco com o joelho firme. Disputar cada
            bola sabendo que a estrutura aguenta. Isso não é dom. É treino na
            ordem certa.
          </p>
        </div>
      </section>
    </>
  );
}
