import { profile } from "@/content/site";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{profile.name}</h1>
        <p className="hero-subtitle">{profile.title}</p>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-cta">
          <a href="#contact" className="cta-button">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
