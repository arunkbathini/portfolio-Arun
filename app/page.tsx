import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import {
  AboutSection,
  CertificationWall,
  ContactCTA,
  ExperienceShowcase,
  SkillProcessBoard,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <ExperienceShowcase />
        <SkillProcessBoard />
        <AboutSection />
        <CertificationWall />
        <ContactCTA />
      </main>
    </div>
  );
}
