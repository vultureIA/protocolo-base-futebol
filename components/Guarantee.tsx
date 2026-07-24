import { GUARANTEE_DAYS } from "@/lib/constants";

export function Guarantee() {
  return (
    <section className="section section-surface" id="garantia">
      <div className="wrap section-narrow reveal">
        <p className="eyebrow">Garantia</p>
        <h2 className="display h2">
          {GUARANTEE_DAYS} dias ou seu dinheiro de volta.
        </h2>
        <p className="lead">
          Acesse, avalie e decida. Se em {GUARANTEE_DAYS} dias não fizer
          sentido pro seu momento, devolvemos 100%. O risco é nosso.
        </p>
      </div>
    </section>
  );
}
