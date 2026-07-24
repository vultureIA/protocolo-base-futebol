import { Bonuses } from "@/components/Bonuses";
import { Credibility } from "@/components/Credibility";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Guarantee } from "@/components/Guarantee";
import { Hero } from "@/components/Hero";
import { Mechanism } from "@/components/Mechanism";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { OfferStack } from "@/components/OfferStack";
import { PainDesire } from "@/components/PainDesire";
import { PriceBlock } from "@/components/PriceBlock";
import { Proof } from "@/components/Proof";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <SiteHeader />
      <main>
        <Hero />
        <Proof />
        <PainDesire />
        <Mechanism />
        <Credibility />
        <OfferStack />
        <PriceBlock />
        <Bonuses />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
