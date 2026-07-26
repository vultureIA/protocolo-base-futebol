import { CtaButton } from "./CtaButton";

export function PriceBlock() {
  return (
    <section className="section inverted field-corners" id="preco">
      <div className="wrap price-block" data-reveal>
        <p className="eyebrow">
          <span className="min">83&apos;</span> — Investimento
        </p>
        <h2 className="display display-lg">
          Pagamento
          <br />
          único.
        </h2>
        <p className="lead">
          18 treinos planejados em 6 semanas. Sem mensalidade. Acesso imediato.
        </p>
        <p className="price-caption">6 semanas · 18 sessões · pagamento único</p>
        <p className="price-now">
          <small>R$</small> 59,90
        </p>
        <p className="price-per">= R$ 3,33 por sessão</p>
        <div className="price-cta">
          <CtaButton
            ctaId="preco"
            label="Garantir acesso — R$ 59,90"
            labelShort="Garantir — R$ 59,90"
          />
          <p className="cta-note">Garantia de 7 dias · reembolso de 100%</p>
        </div>
      </div>
    </section>
  );
}
