import Image from "next/image";
import { CtaButton } from "./CtaButton";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="brand" href="#topo" aria-label="Base Performance">
          <Image
            src="/images/logo-base-horiz-branco-transparent.png"
            alt="Base Performance"
            width={1080}
            height={484}
            priority
            className="brand-logo"
          />
        </a>
        <CtaButton className="header-cta" label="Quero minha base" />
      </div>
    </header>
  );
}
