import Image from "next/image";
import Link from "next/link";
import { impactMetrics, profile, recruiterFit } from "@/content/site";
import { HeroNetworkCanvas } from "./hero-network-canvas";
import { HeroRotator } from "./hero-rotator";
import Reveal from "./reveal";

const heroTools = [
  { name: "Salesforce", icon: "/logos/salesforce.svg" },
  { name: "AWS", icon: "/logos/aws.svg" },
  { name: "Azure", icon: "/logos/azure.svg" },
  { name: "Docker", icon: "/logos/docker.svg" },
  { name: "Kubernetes", icon: "/logos/kubernetes.svg" },
  { name: "Terraform", icon: "/logos/terraform.svg" },
];

export function Hero() {
  return (
      <section className="hero home-hero" aria-labelledby="hero-title">
        <HeroNetworkCanvas />
        <div className="hero-veil" aria-hidden="true" />
        <Reveal className="home-hero-stage">
          <div className="hero-copy">
            <h1 id="hero-title">
              SALESFORCE
              <span>DEVOPS ENGINEER</span>
            </h1>
            <p className="hero-intro">
              I help enterprise teams automate <strong>Salesforce releases</strong>, cloud deployments, CI/CD pipelines,
              and production handoffs across AWS, Azure, Kubernetes, Terraform, GitHub Actions, and Jenkins.
            </p>
            <div className="hero-shipping">
              currently shipping <span aria-hidden="true">-&gt;</span> <HeroRotator />
            </div>
            <div className="hero-actions" aria-label="Primary actions">
              <Link href="#experience">View Work</Link>
              <a
                  href={profile.resumeHref}
                  download
              >
                Download Resume
              </a>
              <Link href="#contact">Contact</Link>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-visual" aria-hidden="true">
              <Image
                  src="/hero-devops-illustration-transparent.png"
                  alt=""
                  width={1024}
                  height={1536}
                  priority
              />
            </div>
            <div className="recruiter-fit-panel" aria-label="Recruiter fit summary">
              {recruiterFit.map((item) => (
                  <article key={item.label}>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </article>
              ))}
            </div>
            <div className="hero-impact-strip" aria-label="Career impact highlights">
              {impactMetrics.map((metric) => (
                  <span key={metric.label}>
                    <strong>{metric.value}</strong>
                    {metric.label}
                  </span>
              ))}
            </div>
            <div className="hero-tool-strip" aria-label="DevOps tools">
              {heroTools.map((tool) => (
                  <span key={tool.name}>
                    <Image src={tool.icon} alt="" width={22} height={22}/>
                    {tool.name}
                  </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
  );
}
