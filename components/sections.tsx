import Link from "next/link";
import type { CSSProperties } from "react";
import {
  stack,
  projects,
  experience,
  skillGroups,
  profile,
  certifications,
} from "@/content/site";
import Reveal from "./reveal";

export function StackTicker() {
  return (
    <section className="ticker" aria-label="Core stack">
      {stack.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </section>
  );
}

export function SelectedWork() {
  return (
    <section className="section" id="work">
      <Reveal className="section-heading">
        <p className="eyebrow">Selected Work</p>
        <h2>Cloud work, presented like a creative portfolio.</h2>
      </Reveal>
      <div className="portfolio-grid">
        {projects.map((project, i) => (
          <Reveal
            key={project.number}
            as="article"
            delay={i * 80}
            className={`portfolio-card ${project.variant ?? "default"}`}
          >
            <span className="card-number">{project.number}</span>
            <h3>{project.title}</h3>
            <p>{project.body}</p>
            {project.caseStudy && (
              <Link
                className="card-link"
                href={`/case-studies/${project.caseStudy}`}
              >
                <span>Read the case study →</span>
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceTimeline() {
  return (
    <section className="section" id="experience">
      <Reveal className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Job titles and timelines across enterprise DevOps teams.</h2>
      </Reveal>
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.role} as="article" className="job" delay={i * 60}>
            <div className="timeline-marker" aria-hidden="true">
              <span />
            </div>
            <time>{job.period}</time>
            <div className="job-copy">
              <p>{job.company}</p>
              <h3>{job.title}</h3>
              <p>{job.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SkillWall() {
  return (
    <section className="section" id="skills">
      <Reveal className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>A focused stack for Salesforce and cloud delivery.</h2>
      </Reveal>
      <div className="skill-wall">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 50}>
            <strong>{group.title}</strong>
            <span>{group.items}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceShowcase() {
  const tools = [
    { name: "Salesforce", icon: "/logos/salesforce.svg", tone: "salesforce" },
    { name: "AWS", icon: "/logos/aws.svg", tone: "aws" },
    { name: "Azure", icon: "/logos/azure.svg", tone: "azure" },
    { name: "GitHub Actions", icon: "/logos/github-actions.svg", tone: "github" },
    { name: "Terraform", icon: "/logos/terraform.svg", tone: "terraform" },
    { name: "Jenkins", icon: "/logos/jenkins.svg", tone: "jenkins" },
    { name: "Docker", icon: "/logos/docker.svg", tone: "docker" },
    { name: "Kubernetes", icon: "/logos/kubernetes.svg", tone: "kubernetes" },
    { name: "Jira", icon: "/logos/jira.svg", tone: "jira" },
    { name: "Grafana", icon: "/logos/grafana.svg", tone: "grafana" },
    { name: "Prometheus", icon: "/logos/prometheus.svg", tone: "prometheus" },
    { name: "ServiceNow", icon: "/logos/servicenow.svg", tone: "servicenow" },
  ];

  return (
    <section className="exp-showcase" id="experience">
      <Reveal className="exp-showcase-heading">
        <h2>
          <span className="exp-heading-main">Pushing Boundaries</span>{" "}
          <span className="exp-heading-muted">since 2012</span>
        </h2>
      </Reveal>
      <div className="exp-showcase-grid">
        <Reveal className="exp-skill-board" delay={80}>
          <div className="exp-skill-board-header">
            <span>{profile.initials}</span>
            <div>
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </div>
          </div>
          <div className="exp-tool-grid" aria-label="Tools Arun has experience with">
            {tools.map((tool, index) => (
              <span
                key={tool.name}
                className={`tool-chip ${tool.tone}`}
                style={{ "--delay": `${index * 0.12}s` } as CSSProperties}
              >
                <span aria-hidden="true">
                  <img
                    src={tool.icon}
                    alt=""
                    loading="lazy"
                  />
                </span>
                {tool.name}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="exp-showcase-copy" delay={140}>
          <p>
            DevOps Engineer with hands-on experience deploying applications and
            platform changes across Salesforce, Azure, and AWS environments
            using CI/CD pipelines. Skilled in writing GitHub Actions workflows
            and provisioning cloud infrastructure with Terraform-based
            Infrastructure as Code.
          </p>
          <div className="exp-role-list">
            {experience.map((job) => (
              <article key={job.role}>
                <strong>{job.title}</strong>
                <span>{job.company}</span>
                <time>{job.period}</time>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SkillProcessBoard() {
  const cards = [
    {
      number: "01",
      title: "Plan",
      body: "Map release scope, approvals, environments, and delivery checkpoints before deployment.",
    },
    {
      number: "02",
      title: "Build",
      body: "Create pipelines, package metadata, and prepare infrastructure changes.",
    },
    {
      number: "03",
      title: "Scan",
      body: "Run quality gates, code scans, dependency checks, and deployment validation.",
    },
    {
      number: "04",
      title: "Deploy",
      body: "Promote changes across environments with controlled release automation.",
    },
    {
      number: "05",
      title: "Monitor",
      body: "Track logs, metrics, alerts, and platform health after release.",
    },
    {
      number: "06",
      title: "Support",
      body: "Handle rollback planning, incident response, and production handoff.",
    },
  ];

  return (
    <section className="skill-process" id="skills">
      <Reveal className="skill-process-heading">
        <p>/ Skills Explained</p>
        <h2>Here&apos;s how it works</h2>
      </Reveal>
      <div className="process-card-row">
        {cards.map((card, index) => (
          <Reveal
            key={card.number}
            as="article"
            className={`process-card card-${index + 1}`}
            delay={index * 80}
          >
            <span>{card.number}</span>
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const roleStories = [
    {
      title: "Salesforce / AWS Cloud DevOps Engineer",
      period: "Sept 2021 — Present",
      company: "Lowe's",
      story:
        "Leading Salesforce release automation, GitHub Actions workflows, DevOps Center delivery, AWS support, Terraform changes, ServiceNow approvals, and production-ready deployment controls.",
    },
    {
      title: "Azure DevOps Engineer",
      period: "Mar 2020 — Sept 2021",
      company: "Home Depot",
      story:
        "Built Azure delivery paths across AKS, ACR, ARM, Terraform, Azure SQL, Cosmos DB, Helm, Azure Functions, Prometheus, and Grafana monitoring.",
    },
    {
      title: "DevOps Engineer",
      period: "Jul 2018 — Feb 2020",
      company: "Urban Outfitters",
      story:
        "Supported cloud platform releases with Azure Pipelines, AKS, App Services, Event Hubs, Cosmos DB, Terraform modules, Azure Front Door, GitHub, and Helm.",
    },
    {
      title: "DevOps Engineer",
      period: "Jun 2016 — Sept 2017",
      company: "HDFC Bank",
      story:
        "Delivered AWS automation across Route53, Lambda, IAM, EC2, S3, DynamoDB, API Gateway, Redshift, Terraform, CloudFormation, Jenkins, Docker, and Kubernetes.",
    },
    {
      title: "Build and Release Engineer",
      period: "Nov 2012 — May 2016",
      company: "Selectsys",
      story:
        "Started in build and release engineering with Jenkins, Git, Maven, ANT, Nexus, Tomcat, Jira, branching strategies, release cycles, scripting, UNIX, and Windows support.",
    },
  ];

  return (
    <section className="about-focus" id="about" aria-labelledby="about-title">
      <Reveal className="about-focus-copy">
        <span className="about-kicker">About Me</span>
        <h1 id="about-title">
          From build releases to cloud delivery, I turn complex deployments into
          calmer systems.
        </h1>
        <p>
          I am Arun Kumar Bathini, a Cloud DevOps Engineer with experience
          across Salesforce, AWS, Azure, CI/CD automation, infrastructure as
          code, containers, monitoring, and production support. My path has been
          shaped by one steady goal: help teams ship changes with clearer
          controls, stronger reliability, and fewer last-minute surprises.
        </p>
      </Reveal>
      <div className="about-role-arc" aria-label="Role overview">
        {roleStories.map((role, index) => (
          <Reveal
            key={`${role.company}-${role.period}`}
            as="article"
            className={`about-role-card role-card-${index + 1}`}
            delay={index * 70}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{role.title}</h2>
            <p>{role.company}</p>
            <time>{role.period}</time>
          </Reveal>
        ))}
      </div>
      <div className="about-role-details" aria-label="Role experience details">
        {roleStories.map((role, index) => (
          <Reveal
            key={role.title + role.company}
            as="article"
            className="about-role-detail"
            delay={index * 55}
          >
            <strong>{role.title}</strong>
            <span>{role.company}</span>
            <p>{role.story}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CertificationWall() {
  return (
    <section className="cert-section" id="certifications">
      <Reveal className="cert-heading">
        <p>Awards</p>
        <h2>Certificate</h2>
      </Reveal>
      <div className="cert-band">
        {certifications.map((cert, i) => (
          <Reveal
            key={`${cert.name}-${cert.year}`}
            as="article"
            className="cert-card"
            delay={i * 80}
          >
            <div className="ribbon" aria-hidden="true">
              <span />
            </div>
            <div>
              <h3>{cert.name}</h3>
              <p>{cert.issuer}</p>
              <time>{cert.year}</time>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="contact contact-cta" id="contact">
      <Reveal className="contact-cta-inner">
        <h2>Let&apos;s Make It Happen</h2>
        <p>
          always open to new opportunities, collaborations, and cloud delivery
          challenges. Let&apos;s work together to build reliable systems.
        </p>
        <div className="contact-actions">
          <a className="contact-pill" href={`mailto:${profile.email}`}>
            <span aria-hidden="true">-&gt;</span>
            Get In Touch
          </a>
          <a
            className="contact-pill secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function ContactFocus() {
  const focusItems = [
    { label: "Salesforce DevOps", tone: "orange" },
    { label: "CI/CD Automation", tone: "blue" },
    { label: "Cloud Platform", tone: "dark" },
    { label: "Release Strategy", tone: "yellow" },
    { label: "Production Support", tone: "pink" },
    { label: "Reliability", tone: "green" },
  ];

  return (
    <section className="contact-focus" aria-labelledby="focus-title">
      <Reveal className="contact-focus-copy">
        <h2 id="focus-title">
          focus is on blending clear release strategy, thoughtful automation,
          and cloud reliability to craft delivery systems that solve real
          problems
        </h2>
      </Reveal>
      <div className="focus-pill-cloud" aria-label="Focus areas">
        {focusItems.map((item, index) => (
          <Reveal
            key={item.label}
            className={`focus-pill ${item.tone}`}
            delay={index * 45}
          >
            <span aria-hidden="true" />
            {item.label}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
