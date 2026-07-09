"use client";

import Link from "next/link";
import Image from "next/image";
import { Target, Layers, ShieldCheck, Activity } from "lucide-react";
import {
  projects,
  skillGroups,
  profile,
  certifications,
  impactMetrics,
  experience,
  aboutHighlights,
  marqueeTools,
  processSteps,
  engineeringQuote,
} from "@/content/site";
import Reveal from "./reveal";

const aboutProofPoints = [
  {
    label: "What I build",
    value: "CI/CD pipelines, Kubernetes platforms, Terraform modules, and cloud release systems.",
  },
  {
    label: "Where I work",
    value: "AWS, Azure, EKS, AKS, RDS, GitHub Actions, Jenkins, and Salesforce DevOps.",
  },
  {
    label: "How I think",
    value: "Make deployments repeatable, observable, and calm enough for healthcare-grade production.",
  },
] as const;

type IconName =
  | "arrow"
  | "download"
  | "linkedin"
  | "location"
  | "globe"
  | "briefcase"
  | "clock"
  | "shield"
  | "message"
  | "check";

function Icon({ name }: { name: IconName }) {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "download":
      return (
        <svg {...commonProps}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 19h14" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...commonProps}>
          <rect width="18" height="18" x="3" y="3" rx="4" />
          <path d="M8 11v5" />
          <path d="M8 8v.01" />
          <path d="M12 16v-5" />
          <path d="M16 16v-3a2 2 0 0 0-4 0" />
        </svg>
      );
    case "location":
      return (
        <svg {...commonProps}>
          <path d="M20 10c0 4.8-8 11-8 11S4 14.8 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "globe":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...commonProps}>
          <path d="M10 6h4" />
          <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <rect width="16" height="14" x="4" y="6" rx="2" />
          <path d="M9 12h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3 5 6v5c0 4.2 2.9 8.1 7 10 4.1-1.9 7-5.8 7-10V6l-7-3Z" />
        </svg>
      );
    case "message":
      return (
        <svg {...commonProps}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...commonProps}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}

export function Marquee() {
  const items = [...marqueeTools, ...marqueeTools];

  return (
    <section className="marquee-section panel-light stack-top" aria-label="Tools and platforms">
      <p className="marquee-label">Tools &amp; platforms I operate daily</p>
      <div className="marquee-track">
        <div className="marquee-track-inner">
          {items.map((tool, i) => (
            <span className="marquee-item" key={`${tool.name}-${i}`}>
              <Image src={tool.logo} alt="" width={26} height={26} />
              {tool.name}
            </span>
          ))}
        </div>
        <div className="marquee-track-inner marquee-track-inner-reverse" aria-hidden="true">
          {items.map((tool, i) => (
            <span className="marquee-item" key={`${tool.name}-reverse-${i}`}>
              <Image src={tool.logo} alt="" width={26} height={26} />
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="section trust-section" id="about" aria-labelledby="trust-title">
      <Reveal className="about-shell" variant="section3d">
        <div className="about-heading-block">
          <p className="eyebrow">About</p>
          <h2 className="trust-heading" id="trust-title">
            Production systems with <span className="accent">calm</span> delivery.
          </h2>
        </div>
        <div className="about-story-card">
          <p className="about-card-kicker">Cloud DevOps Engineer · 13+ years</p>
          <p className="trust-lede">
            I turn fragile deployment processes into repeatable systems teams can trust.
            My work sits between developers and infrastructure: pipelines, clusters,
            cloud migrations, automation, and the runbooks that keep production calm.
          </p>
          <div className="about-proof-list" aria-label="Working style">
            {aboutProofPoints.map((item) => (
              <div className="about-proof-item" key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="expertise-grid" aria-label="Areas of expertise">
        {aboutHighlights.map((item) => (
          <Reveal
            as="article"
            className="trust-card"
            key={item.number}
            variant="card3d"
            delay={160 + Number(item.number) * 45}
          >
            <span className="trust-card-icon" aria-hidden="true">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const workSignals = [
  {
    label: "Release Recovery",
    metric: "40% faster",
    stack: ["Salesforce", "GitHub Actions", "CodeQL", "ServiceNow"],
    summary:
      "Turned manual changesets into a governed release lane with automated checks, handoffs, and rollback discipline.",
  },
  {
    label: "Platform Factory",
    metric: "5 teams enabled",
    stack: ["AKS", "Terraform", "Helm", "Grafana"],
    summary:
      "Built a repeatable Kubernetes delivery platform so teams could promote services across environments independently.",
  },
  {
    label: "Cloud Operations",
    metric: "3 regions",
    stack: ["AWS", "Jenkins", "CloudWatch", "Kubernetes"],
    summary:
      "Operated cloud foundations, CI/CD, and incident-ready observability across distributed production workloads.",
  },
] as const;

export function WorkSkillsSection() {
  return (
    <section className="section work-skills-section" id="work-skills">
      <div className="work-skills-layout">
        <Reveal className="section-heading work-skills-heading">
          <p className="eyebrow">Work / Skills</p>
          <h2>
            Delivery systems that move from <span className="accent">risk</span> to release.
          </h2>
        </Reveal>
        <div className="portfolio-grid">
          {projects.map((project, i) => {
            const signal = workSignals[i];
            const content = (
              <>
                <div className="work-card-topline">
                  <span className="card-number">{project.number}</span>
                  <span className="work-signal">{signal.label}</span>
                </div>
                <div className="work-card-main">
                  <span className="work-metric">{signal.metric}</span>
                  <h3>{project.title}</h3>
                  <p>{signal.summary}</p>
                </div>
                <div className="work-stack" aria-label={`${project.title} stack`}>
                  {signal.stack.map((item) => (
                    <span key={`${project.number}-${item}`}>{item}</span>
                  ))}
                </div>
                {project.caseStudy && <span className="card-link">Open case file →</span>}
              </>
            );
            if (project.caseStudy) {
              return (
                <Reveal key={project.number} delay={i * 80} variant="card3d" className={`portfolio-card ${project.variant ?? "default"}`}>
                  <Link href={`/case-studies/${project.caseStudy}`} style={{ display: "contents" }}>
                    {content}
                  </Link>
                </Reveal>
              );
            }
            return (
              <Reveal
                key={project.number}
                as="article"
                delay={i * 80}
                variant="card3d"
                className={`portfolio-card ${project.variant ?? "default"}`}
              >
                {content}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const processConfig = [
  { Icon: Target,      color: "#6366f1" },
  { Icon: Layers,      color: "#a855f7" },
  { Icon: ShieldCheck, color: "#ec4899" },
  { Icon: Activity,    color: "#fb923c" },
] as const;

export function ProcessSection() {
  return (
    <section className="section process-section" aria-labelledby="process-title">
      <Reveal className="process-heading">
        <h2 id="process-title">
          How I ship, in <span className="accent">4 stages</span>
        </h2>
        <p>Every release follows the same repeatable path — nothing skipped, nothing left to memory.</p>
      </Reveal>
      <div className="process-path">
        <span className="process-path-traveler" aria-hidden="true" />
        <div className="process-grid">
          {processSteps.map((step, i) => {
            const { Icon, color } = processConfig[i];
            return (
              <Reveal as="article" key={step.number} className="process-card" variant="card3d" delay={i * 80}>
                <div
                  className="process-icon-wrap"
                  aria-hidden="true"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${color}33 0%, ${color}0d 38%, transparent 68%)` }}
                >
                  <div
                    className="process-icon-grid"
                    style={{ backgroundImage: `linear-gradient(to right,${color}30 1px,transparent 1px),linear-gradient(to bottom,${color}30 1px,transparent 1px)` }}
                  />
                  <div
                    className="process-icon-center"
                    style={{ borderColor: `${color}44`, boxShadow: `inset 0 0 14px ${color}18, inset 0 0 0 1px rgba(255,255,255,0.04)` }}
                  >
                    <Icon size={20} color={color} strokeWidth={1.75} />
                  </div>
                </div>
                <span className="process-card-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="section" aria-labelledby="skills-title">
      <Reveal className="section-heading">
        <p className="eyebrow">Toolset by category</p>
        <h2 id="skills-title">Every layer of the delivery stack.</h2>
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 40} variant="card3d">
            <strong>{group.title}</strong>
            <span>{group.items}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function StatsQuoteSection() {
  const stat = impactMetrics[2];
  return (
    <section className="section" aria-labelledby="stats-title">
      <Reveal className="stats-section-heading">
        <h2 id="stats-title">
          You get a <span className="accent">proven system</span>
        </h2>
        <p>Not a first attempt — a process refined across a decade of production releases.</p>
      </Reveal>
      <div className="stats-grid">
        <Reveal className="stat-block" variant="card3d">
          <span className="stat-number">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </Reveal>
        <Reveal className="quote-card" variant="card3d" delay={100}>
          <span className="quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="quote-text">{engineeringQuote.quote}</p>
          <div className="quote-attribution">
            <span aria-hidden="true">{profile.initials}</span>
            <div>
              <strong>{engineeringQuote.name}</strong>
              <small>{engineeringQuote.role}</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ShowcaseSection() {
  const featured = projects[0];
  return (
    <section className="section showcase-section" aria-labelledby="showcase-title">
      <Reveal className="showcase-heading">
        <h2 id="showcase-title">
          ...and a system that&apos;s <span className="accent">easy to trust</span>
        </h2>
      </Reveal>
      <Reveal className="showcase-frame" variant="card3d" delay={100}>
        <div className="showcase-frame-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="showcase-frame-body">
          <div className="showcase-copy">
            <span className="eyebrow">Featured · {featured.number}</span>
            <h3>{featured.title}</h3>
            <p>{featured.body}</p>
          </div>
          <div className="showcase-metrics">
            <div>
              <strong>40%</strong>
              <span>Faster releases</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Unplanned rollbacks in 18 months</span>
            </div>
          </div>
        </div>
      </Reveal>
      {featured.caseStudy && (
        <p className="showcase-caption">
          <Link className="card-link" href={`/case-studies/${featured.caseStudy}`}>
            Read the full case study →
          </Link>
        </p>
      )}
    </section>
  );
}

export function HighlightsSection() {
  return (
    <section className="section highlights-section panel-light stack-top" aria-labelledby="highlights-title">
      <Reveal className="highlights-heading">
        <p className="eyebrow">Highlights from each role</p>
        <h2 id="highlights-title">Proof, not just a job title.</h2>
      </Reveal>
      <div className="highlights-grid">
        {experience.map((job, i) => (
          <Reveal as="article" key={`${job.company}-${job.period}`} className="highlight-card" variant="card3d" delay={i * 60}>
            <div className="highlight-avatar-row">
              {job.logo ? (
                <span className="highlight-logo">
                  <Image src={job.logo} alt={`${job.company} logo`} fill sizes="88px" />
                </span>
              ) : (
                <span className="highlight-avatar" aria-hidden="true">
                  {job.company.slice(0, 2).toUpperCase()}
                </span>
              )}
              <div>
                <strong>{job.company}</strong>
                <span>{job.title}</span>
              </div>
            </div>
            <p>{job.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceShowcase() {
  return (
    <section className="section experience-path-section" id="experience" aria-labelledby="experience-title">
      <Reveal className="section-heading experience-path-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title">
          Career path through <span className="accent">release</span>, cloud, and platform work.
        </h2>
      </Reveal>
      <div className="experience-path">
        <svg className="experience-path-line" viewBox="0 0 1200 1420" aria-hidden="true">
          <defs>
            <linearGradient id="experienceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="34%" stopColor="#3b82f6" />
              <stop offset="68%" stopColor="#fb923c" />
              <stop offset="88%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            id="experienceMotionPath"
            d="M175 95 C 760 45 1045 205 1010 390 C 970 605 300 520 235 760 C 178 970 850 905 920 1120 C 980 1304 560 1250 690 1230"
            fill="none"
            opacity="0"
          />
          <path
            className="experience-path-glow"
            d="M175 95 C 760 45 1045 205 1010 390 C 970 605 300 520 235 760 C 178 970 850 905 920 1120 C 980 1304 560 1250 690 1230"
          />
          <path
            className="experience-path-core"
            d="M175 95 C 760 45 1045 205 1010 390 C 970 605 300 520 235 760 C 178 970 850 905 920 1120 C 980 1304 560 1250 690 1230"
          />
          <circle className="experience-path-traveler" r="14">
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#experienceMotionPath" />
            </animateMotion>
          </circle>
        </svg>
        {experience.map((job, index) => {
          const tags = job.body
            .replace(/\.$/, "")
            .split(", ")
            .slice(0, 5)
            .map((tag) => tag.replace(/^and\s+/i, ""));

          return (
            <Reveal
              as="article"
              key={`${job.company}-${job.period}`}
              className={`experience-flow-card experience-flow-card-${index + 1}`}
              variant="card3d"
              delay={index * 70}
            >
              <div className="experience-flow-icon">
                {job.logo ? (
                  <Image src={job.logo} alt="" fill sizes="42px" />
                ) : (
                  <span aria-hidden="true">{job.company.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <div className="experience-flow-meta">
                  <time>{job.period}</time>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>
                  <span>{job.company}</span>
                  {job.title}
                </h3>
                <p>{job.body}</p>
                <div className="experience-tags">
                  {tags.map((tag) => (
                    <span key={`${job.company}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function CertificationWall() {
  return (
    <section className="section cert-section" id="certifications" aria-labelledby="cert-title">
      <Reveal className="cert-heading">
        <p className="eyebrow">Certifications</p>
        <h2 id="cert-title">Certifications</h2>
      </Reveal>
      <div className="cert-band">
        {certifications.map((cert, i) => (
          <Reveal key={`${cert.name}-${cert.year}`} as="article" className="cert-card" variant="card3d" delay={i * 80}>
            <span className="cert-icon" aria-hidden="true">
              <Icon name="check" />
            </span>
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
  const contactHighlights = [
    { label: "Austin, TX", icon: "location" },
    { label: "Remote or hybrid", icon: "globe" },
    { label: "C2C or contract-to-hire", icon: "briefcase" },
    { label: "Replies within a day", icon: "clock" },
  ] as const;

  return (
    <section className="contact contact-cta" id="contact">
      <Reveal className="contact-cta-inner" variant="fade">
        <div className="contact-status">
          <span className="pulse-dot" aria-hidden="true" />
          <p className="contact-kicker">Available for new roles</p>
        </div>
        <h2>
          Ready to join <span className="accent">your team</span>
        </h2>
        <p>Cloud DevOps and Salesforce DevOps support for teams shipping production work.</p>
        <div className="contact-direct" aria-label="Availability details">
          {contactHighlights.map((item) => (
            <span key={item.label}>
              <Icon name={item.icon} />
              {item.label}
            </span>
          ))}
        </div>
        <div className="contact-actions">
          <a className="contact-pill" href={`mailto:${profile.email}`}>
            <Icon name="arrow" />
            Get in touch
          </a>
          <a className="contact-pill resume" href={profile.resumeHref} download>
            <Icon name="download" />
            Download resume
          </a>
          <a
            className="contact-pill secondary"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="linkedin" />
            LinkedIn
          </a>
        </div>
        <p className="contact-email">
          or email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </Reveal>
    </section>
  );
}
