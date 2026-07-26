const WEEKS = [1, 2, 3, 4, 5, 6];

export function Mechanism() {
  return (
    <section className="section bg-surface-1 field-center" id="protocolo">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">
            <span className="min">45&apos;</span> · Intervalo · O protocolo
          </p>
          <h2 className="display display-lg">
            Seis semanas.
            <br />
            Duas fases.
            <br />
            Uma ordem.
          </h2>
          <p className="lead">
            Primeiro o corpo aprende a se segurar. Depois aprende a explodir.
            Nessa ordem, porque potência sem base é lesão marcando hora.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-track">
            {WEEKS.map((week) => (
              <span
                className={`timeline-week${week > 2 ? " phase-2" : ""}`}
                key={week}
              >
                S{week}
              </span>
            ))}
          </div>
          <div className="timeline-labels">
            <span className="mono-caption">Fase 1 · Base Atlética</span>
            <span className="mono-caption">
              Fase 2 · Potência e Desaceleração
            </span>
          </div>
        </div>

        <div className="phases" data-reveal>
          <div className="phase-card">
            <p className="kicker">Fase 1 · Semanas 1–2</p>
            <h3>Base Atlética</h3>
            <p>
              Mobilidade, estabilidade, coordenação e controle corporal. O chassi
              antes do motor.
            </p>
          </div>
          <div className="phase-card">
            <p className="kicker">Fase 2 · Semanas 3–6</p>
            <h3>Potência e Desaceleração</h3>
            <p>
              Força, saltos, aceleração, cadeia posterior e frenagem. O que o
              jogo cobra, construído sobre a base pronta.
            </p>
          </div>
        </div>

        <p className="mechanism-note">
          3 sessões por semana · progressão definida treino a treino ·
          aquecimento e prevenção já dentro de cada sessão
        </p>

        <p className="mechanism-link">
          <a className="text-link" href="#oferta">
            O que entra no acesso ↓
          </a>
        </p>
      </div>
    </section>
  );
}
