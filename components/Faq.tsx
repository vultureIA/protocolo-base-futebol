export function Faq() {
  const items = [
    {
      q: "Serve pra mim se eu não sou atleta profissional?",
      a: "Sim. O protocolo constrói base atlética no futebol: amador, competitivo ou retorno pós-afastamento.",
    },
    {
      q: "É um treino genérico da internet?",
      a: "Não. São 6 semanas em duas fases, com progressão e a mesma lógica do case do Berô.",
    },
    {
      q: "E se eu estiver voltando de lesão?",
      a: "O foco é reconstruir base com segurança. Com restrição médica ativa, alinhe com seu profissional de saúde antes de iniciar.",
    },
    {
      q: "Quanto tempo por semana?",
      a: "Três sessões por semana, com progressão ao longo das 6 semanas.",
    },
    {
      q: "E se eu não gostar?",
      a: "Garantia de 7 dias com reembolso de 100%.",
    },
  ];

  return (
    <section className="section" id="faq">
      <div className="wrap faq-wrap">
        <div className="section-intro reveal">
          <p className="eyebrow">FAQ</p>
          <h2 className="display h2">Antes de decidir.</h2>
        </div>
        <div className="faq reveal">
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
