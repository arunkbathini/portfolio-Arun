import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Hero } from "@/components/hero";
import OpportunityDesk from "@/components/opportunity-desk";
import {
  Marquee,
  TrustSection,
  ExperienceShowcase,
  CertificationWall,
  ContactCTA,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <TrustSection />
        <ExperienceShowcase />
        <CertificationWall />
        <OpportunityDesk />
        <ContactCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
