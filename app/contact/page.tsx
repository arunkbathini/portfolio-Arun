import SiteHeader from "@/components/site-header";
import { ContactCTA } from "@/components/sections";

export default function ContactPage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <ContactCTA />
      </main>
    </div>
  );
}
