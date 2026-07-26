import { GUARANTEE_DAYS } from "@/lib/constants";
import { CtaButton } from "./CtaButton";

export function Guarantee() {
  return (
    <section className="section bg-blackout" id="garantia">
      <div className="wrap">
        <div className="guarantee" data-reveal>
          <div>
            <div className="badge-guarantee">
              <strong>{GUARANTEE_DAYS}</strong>
            </div>
            <p className="badge-label">Dias de garantia total</p>
          </div>
          <div>
            <p className="eyebrow">
              <span className="min">85&apos;</span> — Risco zero
            </p>
            <h2 className="display display-md">
              Treine a<br />
              semana 1.
              <br />
              Depois decida.
            </h2>
            <p className="lead">
              A garantia cobre 7 dias — tempo de fazer a primeira semana
              completa do protocolo, com as 3 sessões. Entra, treina, sente no
              corpo. Se não for pra você, pede o reembolso pela Eduzz e recebe
              100%. O risco é nosso.
            </p>
            <div className="guarantee-cta">
              <CtaButton ctaId="garantia" label="Começar sem risco" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
