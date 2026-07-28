"use client";

import {
  AB_VARIANT,
  CHECKOUT_URL,
  PRICE_NUMBER,
  PRODUCT_NAME,
  type CtaId,
} from "@/lib/constants";

type CtaButtonProps = {
  label: string;
  /** Label curto exibido ≤400px (o completo não cabe em viewports estreitos). */
  labelShort?: string;
  ctaId: CtaId;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
};

/** Repassa utm_* e fbclid da LP para o checkout Eduzz. */
function buildCheckoutUrl(base: string): string {
  if (typeof window === "undefined") return base;
  try {
    const inParams = new URLSearchParams(window.location.search);
    const url = new URL(base);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(
      (key) => {
        const value = inParams.get(key);
        if (value) url.searchParams.set(key, value);
      }
    );
    return url.toString();
  } catch {
    return base;
  }
}

export function CtaButton({
  label,
  labelShort,
  ctaId,
  variant = "primary",
  className = "",
  href = CHECKOUT_URL,
}: CtaButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // href resolvido no clique — evita mismatch de hidratação com UTMs
    event.currentTarget.href = buildCheckoutUrl(href);
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_name: PRODUCT_NAME,
        value: PRICE_NUMBER,
        currency: "BRL",
        cta_id: ctaId,
        ab_variant: AB_VARIANT,
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant} ${className}`.trim()}
    >
      {labelShort ? (
        <>
          <span className="label-full">{label}</span>
          <span className="label-short">{labelShort}</span>
        </>
      ) : (
        label
      )}
    </a>
  );
}
