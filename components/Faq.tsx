const ITEMS = [
  {
    question: "Não sou atleta. Serve pra mim?",
    answer:
      "Sim. O protocolo constrói base atlética pro futebol: amador de fim de semana, quem compete e quem volta depois de um tempo parado. A Fase 1 existe exatamente pra nivelar o ponto de partida.",
  },
  {
    question: "É mais um treino genérico de internet?",
    answer:
      "Não. São 6 semanas fechadas em duas fases, com séries, repetições e progressão definidas treino a treino — a mesma lógica que o Erivelton aplicou no case do Berô.",
  },
  {
    question: "Estou voltando de lesão ou de um tempo parado. Posso fazer?",
    answer:
      "O protocolo começa reconstruindo mobilidade, estabilidade e controle antes de qualquer trabalho de potência. Mas se você tem restrição médica ativa, libere com seu médico ou fisioterapeuta antes de iniciar.",
  },
  {
    question: "Quanto tempo por semana?",
    answer:
      "3 sessões por semana, ao longo de 6 semanas. Aquecimento e prevenção já estão dentro de cada sessão — você não precisa montar nada por fora.",
  },
  {
    question: "Funciona pra qualquer posição?",
    answer:
      "As capacidades do protocolo — aceleração, frenagem, mudança de direção, força e estabilidade — são a base física de qualquer jogador de linha. O que muda entre posições é o jogo, não a base.",
  },
  {
    question: "Nível mínimo de condicionamento?",
    answer:
      "Não há pré-requisito de performance. A Fase 1 (semanas 1–2) constrói exatamente o piso: mobilidade, estabilidade e coordenação. Com restrição médica ativa, alinhe com um profissional de saúde antes.",
  },
  {
    question: "E se não for pra mim?",
    answer:
      "Você tem 7 dias de garantia — dá pra treinar a primeira semana inteira. Não fez sentido, pede reembolso pela Eduzz e recebe 100%.",
  },
];

export function Faq() {
  return (
    <section className="section cut-line field-sideline-right" id="faq">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">
            <span className="min">88&apos;</span> — FAQ
          </p>
          <h2 className="display display-lg">
            Antes de
            <br />
            decidir.
          </h2>
        </div>
        <div className="faq" data-reveal>
          {ITEMS.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
