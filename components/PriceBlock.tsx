import { PRICE } from "@/lib/constants";
import { CtaButton } from "./CtaButton";

export function PriceBlock() {
  return (
    <section className="section section-surface" id="preco">
      <div className="wrap price-wrap reveal">
        <p className="eyebrow">Investimento</p>
        <h2 className="display h2">Protocolo completo. Pagamento único.</h2>
        <p className="lead">
          Acesso imediato às 6 semanas, com progressão pronta pra aplicar no
          treino.
        </p>
        <p className="now">
          <small>R$</small>
          {PRICE}
        </p>
        <p className="cta-note">Sem mensalidade · Garantia de 7 dias</p>
        <CtaButton label={`Quero o protocolo por R$ ${PRICE}`} />
      </div>
    </section>
  );
}
