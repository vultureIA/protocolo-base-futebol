export function OfferStack() {
  const items = [
    {
      title: "Protocolo Base Futebol",
      desc: "Fase 1 Base Atlética + Fase 2 Potência, Força e Desaceleração. 6 semanas.",
    },
    {
      title: "Progressão semana a semana",
      desc: "Séries, reps e avanço de carga já definidos no mesociclo.",
    },
    {
      title: "3 sessões por semana",
      desc: "Treinos numerados pra encaixar na rotina (ex.: seg/qua/sex).",
    },
    {
      title: "Método EF Performance",
      desc: "A mesma lógica usada no case do Berô: mobilidade, estabilidade, força e potência.",
    },
  ];

  return (
    <section className="section" id="oferta">
      <div className="wrap stack-lg">
        <div className="section-intro reveal">
          <h2 className="display h2">O que entra no acesso.</h2>
          <p className="lead">
            Protocolo completo, com progressão pronta pra aplicar.
          </p>
        </div>

        <div className="offer-stack reveal">
          {items.map((item, index) => (
            <div className="offer-item" key={item.title}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
