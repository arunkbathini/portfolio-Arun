import SiteHeader from "@/components/site-header";
import {
  ExperienceShowcase,
  SkillProcessBoard,
} from "@/components/sections";

export default function ExperiencePage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <ExperienceShowcase />
        <SkillProcessBoard />
      </main>
    </div>
  );
}
