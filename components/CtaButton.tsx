import { CHECKOUT_URL } from "@/lib/constants";

type CtaButtonProps = {
  label?: string;
  variant?: "primary" | "dark" | "light" | "ghost";
  block?: boolean;
  className?: string;
  href?: string;
};

export function CtaButton({
  label = "Quero reconstruir minha base",
  variant = "primary",
  block = false,
  className = "",
  href = CHECKOUT_URL,
}: CtaButtonProps) {
  const variantClass =
    variant === "dark"
      ? "btn-dark"
      : variant === "light"
        ? "btn-light"
        : variant === "ghost"
          ? "btn-ghost"
          : "";

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={`btn ${variantClass} ${block ? "btn-block" : ""} ${className}`.trim()}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
