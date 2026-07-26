import { PRICE } from "@/lib/constants";
import { CtaButton } from "./CtaButton";

export function MobileCtaBar() {
  return (
    <div className="mobile-cta-bar">
      <div className="bar-info">
        <strong>R$ {PRICE}</strong>
        <span>Garantia 7 dias</span>
      </div>
      <CtaButton ctaId="mobile_bar" label="Começar" />
    </div>
  );
}
