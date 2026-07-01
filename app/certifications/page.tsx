import SiteHeader from "@/components/site-header";
import { CertificationWall } from "@/components/sections";

export default function CertificationsPage() {
  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <CertificationWall />
      </main>
    </div>
  );
}
