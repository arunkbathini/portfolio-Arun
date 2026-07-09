"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Cloud, Triangle, Cloudy, Container, Hexagon, Layers } from "lucide-react";
import { profile } from "@/content/site";
import Reveal from "./reveal";
import { scrollToHash } from "@/lib/scroll-to";

const heroTech = [
  { label: "AWS", Icon: Cloud, color: "#ff9900" },
  { label: "Azure", Icon: Triangle, color: "#3aa0e3" },
  { label: "Salesforce", Icon: Cloudy, color: "#00a1e0" },
  { label: "Docker", Icon: Container, color: "#2496ed" },
  { label: "Kubernetes", Icon: Hexagon, color: "#5b7fe0" },
  { label: "Terraform", Icon: Layers, color: "#8055d6" },
];

const shippingPhrases = [
  "Salesforce releases",
  "cloud deployments",
  "CI/CD pipelines",
  "Kubernetes clusters",
];

function ShippingRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % shippingPhrases.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <strong key={shippingPhrases[index]} className="hero-rotating-word">
      {shippingPhrases[index]}
    </strong>
  );
}

export function Hero() {
  return (
    <section className="hero home-hero" aria-labelledby="hero-title">
      <div className="hero-blob" aria-hidden="true" />
      <Reveal className="hero-inner" variant="fade">
        <div className="hero-copy-stack">
          <h1 className="hero-title hero-title-cloud" id="hero-title">
            CLOUD
            <span>DEVOPS ENGINEER</span>
          </h1>

          <p className="hero-lede hero-cloud-lede">
            Cloud DevOps Engineer with <strong>13+ years</strong> turning fragile deployments
            into boring, repeatable ones. AWS and Azure, Kubernetes and Terraform,
            pipelines that actually gate on quality.
          </p>

          <div className="hero-shipping-line">
            currently shipping <span aria-hidden="true">-&gt;</span> <ShippingRotator />
          </div>

          <div className="hero-cta-row">
            <a className="btn btn-primary" href="#experience" onClick={(e) => scrollToHash(e, "#experience")}>
              View Experience
            </a>
            <a
              className="btn btn-outline"
              href={profile.resumeHref}
              download
              data-analytics-event="resume_download"
              data-analytics-label="Hero resume"
            >
              Download Resume
            </a>
            <a
              className="btn btn-outline"
              href="#contact"
              onClick={(e) => scrollToHash(e, "#contact")}
              data-analytics-event="contact_click"
              data-analytics-label="Hero contact"
            >
              Contact
            </a>
          </div>
        </div>

        <aside className="hero-visual-stack target-roles-card" aria-label="DevOps capability summary">
          <div className="target-roles-shell">
            <article className="target-card target-card-top">
              <span className="target-label">Target Roles</span>
              <h2>Cloud DevOps Engineer, Salesforce DevOps, Site Reliability Engineer, Platform Engineering</h2>
            </article>

            <div className="target-bottom-wrap">
              <div className="target-bottom-row">
                <article className="target-card target-card-bottom target-card-left">
                  <span className="blueprint-marker marker-left" aria-hidden="true" />
                  <span className="target-label">Core Expertise</span>
                  <p>Salesforce DevOps Center, GitHub Actions, Jenkins, Kubernetes, Terraform, AWS, Azure</p>
                </article>

                <article className="target-card target-card-bottom target-card-right">
                  <span className="blueprint-marker marker-right" aria-hidden="true" />
                  <span className="target-label">Specialization</span>
                  <p>Enterprise release automation, multi-cloud infrastructure, production reliability, DevOps toolchain integration</p>
                </article>
              </div>

              <div className="target-orb">
                <Image
                  src="/arun-profile-orb.png"
                  alt={profile.name}
                  fill
                  sizes="112px"
                  className="target-orb-img"
                  priority
                />
              </div>
            </div>

            <div className="target-tech-bar" aria-label="Tools">
              {heroTech.map(({ label, Icon, color }, index) => (
                <div className="target-tech-group" key={label}>
                  {index > 0 && <span className="target-divider" aria-hidden="true" />}
                  <span className="target-tech-item">
                    <Icon size={16} color={color} strokeWidth={2} aria-hidden="true" />
                    <span>{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
