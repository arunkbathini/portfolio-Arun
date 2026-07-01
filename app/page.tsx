import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  );
}
