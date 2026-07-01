import SiteHeader from "@/components/site-header";
import { AboutSection } from "@/components/sections";

export default function AboutPage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <AboutSection />
      </main>
    </div>
  );
}
