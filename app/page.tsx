import { Credibility } from "@/components/Credibility";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Guarantee } from "@/components/Guarantee";
import { OrbitHero } from "@/components/OrbitHero";
import { Mechanism } from "@/components/Mechanism";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { OfferStack } from "@/components/OfferStack";
import { PageEffects } from "@/components/PageEffects";
import { PainDesire } from "@/components/PainDesire";
import { PriceBlock } from "@/components/PriceBlock";
import { Proof } from "@/components/Proof";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <PageEffects />
      <SiteHeader />
      <main>
        <OrbitHero />
        <Proof />
        <PainDesire />
        <Mechanism />
        <Credibility />
        <OfferStack />
        <PriceBlock />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
