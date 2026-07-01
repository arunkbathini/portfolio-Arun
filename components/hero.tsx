import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/site";
import Reveal from "./reveal";

export default function Hero() {
  return (
    <section className="hero home-hero" aria-labelledby="hero-title">
      <Reveal className="home-hero-stage">
        <div className="hero-title-stack">
          <h1 id="hero-title">Hi I&apos;m Arun kumar</h1>
          <p>{profile.role}</p>
        </div>

        <div className="hero-photo-cutout">
          <Image
            src={profile.photoHref}
            alt={`${profile.name} portrait`}
            width={1877}
            height={2899}
            priority
          />
        </div>

        <div className="availability-pill">
          <span />
          Available for new opportunities
        </div>

        <p className="hero-side-copy">
          passionate about building reliable cloud platforms, automation, and
          delivery systems that create value.
        </p>

        <Link className="hero-contact-link" href="/contact">
          <span aria-hidden="true">-&gt;</span>
          Get in Touch
        </Link>
      </Reveal>
    </section>
  );
}
