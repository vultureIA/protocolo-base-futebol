const ITEMS = [
  {
    num: "01",
    title: "Protocolo Base Futebol completo",
    body: "6 semanas: Fase 1 Base Atlética + Fase 2 Potência e Desaceleração.",
  },
  {
    num: "02",
    title: "Progressão pronta",
    body: "Séries, repetições e avanço definidos semana a semana. Você não monta nada. Só executa.",
  },
  {
    num: "03",
    title: "3 sessões por semana",
    body: "Treinos numerados pra encaixar na rotina (ex.: seg/qua/sex).",
  },
  {
    num: "04",
    title: "Aquecimento e prevenção em toda sessão",
    body: "Mobilidade de tornozelo, quadril e tronco + estabilidade, pensados pra reduzir risco no futebol. Isso não é bônus: é parte do treino.",
  },
  {
    num: "05",
    title: "Método EF Performance",
    body: "A mesma lógica aplicada no case do Berô: mobilidade, estabilidade, força, potência.",
  },
];

export function OfferStack() {
  return (
    <section className="section tick-divider" id="oferta">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">
            <span className="min">72&apos;</span> · O acesso
          </p>
          <h2 className="display display-lg">
            Tudo que
            <br />
            entra no acesso.
          </h2>
          <p className="lead">O produto é o protocolo: inteiro, pronto pra executar.</p>
        </div>

        <div className="offer-card" data-reveal>
          {ITEMS.map((item) => (
            <div className="offer-item" key={item.num}>
              <span className="num">{item.num}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="offer-note">
          Sem lista inflada de bônus pra maquiar valor. O que está aqui é o que
          você usa.
        </p>
      </div>
    </section>
  );
}
