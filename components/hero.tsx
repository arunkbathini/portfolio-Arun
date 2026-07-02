import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/site";
import Reveal from "./reveal";

const heroTools = [
  { name: "Salesforce", icon: "/logos/salesforce.svg" },
  { name: "AWS", icon: "/logos/aws.svg" },
  { name: "Azure", icon: "/logos/azure.svg" },
  { name: "Docker", icon: "/logos/docker.svg" },
  { name: "Kubernetes", icon: "/logos/kubernetes.svg" },
  { name: "Terraform", icon: "/logos/terraform.svg" },
];

export default function Hero() {
  return (
    <section className="hero home-hero" aria-labelledby="hero-title">
      <Reveal className="home-hero-stage">
        <div className="hero-copy">
          <p className="hero-kicker">{profile.role}</p>
          <h1 id="hero-title">Welcome,</h1>
          <p className="hero-intro">
            I am Arun, a Cloud DevOps Engineer specializing in{" "}
            <span>Salesforce DevOps</span>, AWS, Azure, and CI/CD automation.
            I build reliable release systems that help teams ship with
            confidence.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <Link href="#experience">View Work</Link>
            <Link href="#contact">Contact</Link>
          </div>
          <div className="hero-tool-strip" aria-label="DevOps tools">
            {heroTools.map((tool) => (
              <span key={tool.name}>
                <img src={tool.icon} alt="" />
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <Image
            src="/hero-devops-illustration-transparent.png"
            alt=""
            width={1024}
            height={1536}
            priority
          />
        </div>
      </Reveal>
    </section>
  );
}
