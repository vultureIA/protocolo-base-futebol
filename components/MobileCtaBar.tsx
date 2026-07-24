import { CtaButton } from "./CtaButton";

export function MobileCtaBar() {
  return (
    <div className="mobile-cta-bar">
      <div>
        <strong>R$ 59,90</strong>
        <span>Garantia 7 dias</span>
      </div>
      <CtaButton label="Quero minha base" />
    </div>
  );
}
