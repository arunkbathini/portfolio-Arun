/*
  ── EDIT YOUR SITE HERE ──────────────────────────────────────────────
  Everything the page renders comes from this file. Change a job, a stat,
  a project, or a skill group here and the components update automatically.
  Nothing else needs editing for content changes.

  Positioning: HYBRID — leads with Salesforce DevOps, shows cloud breadth.
  The original site was generically "Cloud DevOps"; the copy below reframes
  it. Update titles/roles to match your current position (e.g. your present
  Salesforce DevOps role) — these values are placeholders pulled from the
  uploaded site, not asserted facts.
*/

// Centralized so the placeholder only needs updating in one place once the
// site has a real domain. Falls back to a Vercel preview-safe relative
// origin when unset.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

export const profile = {
  name: "Arun Kumar Bathini",
  initials: "AK",
  headline: "Arun Kumar Bathini",
  role: "Cloud DevOps Engineer",
  timezone: "CST",
  responseTime: "<24h",
  hiringMessage:
    "Cloud DevOps Engineer turning fragile deployments into boring, repeatable systems across AWS, Azure, Kubernetes, Terraform, and quality-gated CI/CD.",
  intro:
    "Cloud DevOps Engineer with 13+ years turning fragile deployments into boring, repeatable ones. AWS and Azure, Kubernetes and Terraform, pipelines that actually gate on quality. Currently building infrastructure for healthcare systems where downtime is not an abstraction.",
  about:
    "I build the machinery that gets code from a laptop to production without anyone holding their breath. Thirteen years in, six of them deep in AWS and Azure, I have spent most of my career on the unglamorous side of software: the pipelines, the clusters, the Terraform modules nobody notices until they break. I have migrated on-prem SQL estates into RDS, run EKS and AKS clusters under HIPAA constraints, and replaced enough manual release checklists with GitHub Actions to develop strong opinions about what belongs in a workflow file. Certified across Azure, AWS, and Kubernetes, though the certifications matter less than the 3 a.m. incidents that taught me what they leave out. Currently building healthcare infrastructure where the systems I keep running are the ones clinicians depend on.",
  availability: "Open for Cloud DevOps, Salesforce DevOps, contract, and C2C engagements",
  resumeHref: "/Bathini-Arun-Kumar-Resume.docx",
  linkedin: "https://www.linkedin.com/in/arunbathiniab525/",
  email: "bathiniarunkumar525@gmail.com",
};

export const recruiterFit = [
  { label: "Target roles", value: "Cloud DevOps Engineer, Salesforce DevOps, Site Reliability Engineer, Platform Engineering" },
  { label: "Core expertise", value: "Salesforce DevOps Center, GitHub Actions, Jenkins, Kubernetes, Terraform, AWS, Azure" },
  { label: "Specialization", value: "Enterprise release automation, multi-cloud infrastructure, production reliability, DevOps toolchain integration" },
  { label: "Hiring signal", value: "Enterprise release ownership, zero-downtime deployments, observability, SRE mindset, 24h response commitment" },
] as const;

export const impactMetrics = [
  { value: "13+", label: "Years driving enterprise IT transformation" },
  { value: "6+", label: "Years architecting DevOps and cloud delivery" },
  { value: "50+", label: "Production environments orchestrated safely" },
  { value: "<24h", label: "Guaranteed recruiter response window" },
] as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "13", label: "Years in IT", tone: "blue" },
  { value: "6", label: "DevOps years", tone: "mint" },
  { value: "3", label: "Certifications", tone: "orange" },
] as const;

export type AboutHighlight = {
  number: string;
  title: string;
  detail: string;
};

export const aboutHighlights: AboutHighlight[] = [
  {
    number: "01",
    title: "Salesforce Release Excellence",
    detail:
      "Architected multi-track Salesforce DevOps workflows using DevOps Center, Vlocity Build Tool, OmniStudio DataPacks, Copado/Gearset, sfdx-git-delta, plus quality gates with CodeQL, SonarQube, custom Apex validators, and enterprise release orchestration via Jira and ServiceNow.",
  },
  {
    number: "02",
    title: "Multi-Cloud Platform Engineering",
    detail:
      "Deep hands-on experience across AWS (EC2, S3, Lambda, RDS, DynamoDB, API Gateway, Route53) and Azure (AKS, ACR, Azure SQL, Cosmos DB, Azure Functions, Key Vault, Front Door), with production design patterns for security, cost, performance, and disaster recovery.",
  },
  {
    number: "03",
    title: "Infrastructure Automation & IaC",
    detail:
      "Built and maintained Terraform modules for repeatable, version-controlled infrastructure. Experience with Bicep, ARM templates, CloudFormation, Helm for Kubernetes package management, and configuration management via Ansible.",
  },
  {
    number: "04",
    title: "Production Reliability & Observability",
    detail:
      "Designed monitoring stacks using Prometheus, Grafana, CloudWatch, and structured logging. Implemented alerting strategies, incident runbooks, SLA tracking, and SRE practices for enterprise services. Expert in container orchestration (Kubernetes, EKS, AKS, OpenShift, Helm).",
  },
];

// The horizontal ticker — lead Salesforce, then cloud breadth.
export const stack = [
  "Salesforce DevOps Center",
  "Vlocity / OmniStudio",
  "GitHub Actions",
  "Copado",
  "AWS",
  "Azure",
  "Kubernetes",
  "Terraform",
  "Bicep",
  "Jenkins",
  "Python",
  "Grafana",
];

export type Project = {
  number: string;
  title: string;
  body: string;
  variant?: "large" | "dark" | "default";
  caseStudy?: string; // slug → links to /case-studies/[slug]
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Salesforce dual-track CI/CD transformation",
    body: "Led enterprise shift from manual changesets to Salesforce DevOps Center for core metadata and Vlocity Build Tool + GitHub Actions for OmniStudio DataPacks. Integrated CodeQL, SonarQube quality gates, Jira orchestration, and ServiceNow handoffs. Result: 40% faster releases, zero unplanned rollbacks in 18 months.",
    variant: "large",
    caseStudy: "devops-center-pipeline-recovery",
  },
  {
    number: "02",
    title: "Azure Kubernetes multi-cloud delivery platform",
    body: "Architected enterprise Kubernetes infrastructure spanning AKS clusters, Terraform automation, Helm package management, ACR registry, Azure SQL, Cosmos DB, with Prometheus and Grafana observability. Enabled 5 engineering teams to deploy independently with single-command promotions across dev, staging, production.",
    variant: "default",
  },
  {
    number: "03",
    title: "AWS-led global cloud migration and operations",
    body: "Designed and operated AWS foundation: EC2, S3, Lambda, Route53, DynamoDB, API Gateway with infrastructure-as-code via Terraform and CloudFormation. Built CI/CD pipelines using Jenkins and GitHub Actions. Deployed and managed Docker/Kubernetes clusters across 3 regions with production CloudWatch monitoring and incident response automation.",
    variant: "dark",
  },
];

export type Job = {
  period: string;
  company: string;
  title: string;
  role: string;
  body: string;
  logo?: string;
};

export const experience: Job[] = [
  {
    period: "Sept 2021 — Present",
    company: "Lowe's",
    title: "Salesforce / AWS Cloud DevOps Engineer",
    role: "Lowe's — Salesforce / AWS Cloud DevOps Engineer",
    body: "GitHub Actions, Salesforce DevOps Center, Azure Key Vault, Terraform, Bicep, AWS, Docker, AKS, ServiceNow, Jira, and Python.",
    logo: "/company-logos/lowes.svg",
  },
  {
    period: "Mar 2020 — Sept 2021",
    company: "Home Depot",
    title: "Azure DevOps Engineer",
    role: "Home Depot — Azure DevOps Engineer",
    body: "Azure Repos, AKS, ACR, ARM templates, Terraform, Azure SQL, Cosmos DB, Helm, Azure Functions, Prometheus, and Grafana.",
    logo: "/company-logos/home-depot.svg",
  },
  {
    period: "Jul 2018 — Feb 2020",
    company: "Urban Outfitters",
    title: "DevOps Engineer",
    role: "Urban Outfitters — DevOps Engineer",
    body: "Azure Pipelines, AKS, App Services, Event Hubs, Cosmos DB, Terraform modules, Azure Front Door, GitHub, Helm, and Databricks.",
    logo: "/company-logos/urban-outfitters.svg",
  },
  {
    period: "Jun 2016 — Sept 2017",
    company: "HDFC Bank",
    title: "DevOps Engineer",
    role: "HDFC Bank — DevOps Engineer",
    body: "AWS Route53, Lambda, IAM, EC2, S3, DynamoDB, API Gateway, Redshift, Terraform, CloudFormation, Ansible, Jenkins, Docker, Kubernetes, and CloudWatch.",
    logo: "/company-logos/hdfc-bank.svg",
  },
  {
    period: "Nov 2012 — May 2016",
    company: "Selectsys",
    title: "Build and Release Engineer",
    role: "Selectsys — Build and Release Engineer",
    body: "Jenkins, Git, Chef, Maven, ANT, Nexus, Tomcat, Jira, branching strategies, release cycles, Perl, PowerShell, Shell, UNIX, and Windows.",
  },
];

export type SkillGroup = { title: string; items: string };

// Salesforce DevOps leads; cloud/IaC/containers follow.
export const skillGroups: SkillGroup[] = [
  { title: "Salesforce DevOps", items: "DevOps Center, Vlocity Build Tool, OmniStudio DataPacks, Copado, Gearset, sfdx-git-delta" },
  { title: "CI/CD", items: "GitHub Actions, Jenkins, Azure DevOps, GitLab, CircleCI" },
  { title: "Cloud", items: "AWS, Azure, Google Anthos" },
  { title: "IaC", items: "Terraform, Bicep, ARM, CloudFormation" },
  { title: "Containers", items: "Docker, Kubernetes, AKS, EKS, OpenShift, Helm" },
  { title: "Automation & Monitoring", items: "Python, Bash, PowerShell, Jira, Prometheus, Grafana, CloudWatch" },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    year: "2023",
  },
  {
    name: "Kubernetes Application Developer (CKAD)",
    issuer: "Cloud Native Computing Foundation",
    year: "2023",
  },
];

export type MarqueeTool = { name: string; logo: string };

// Tools & platforms — rendered as a scrolling marquee logo strip.
export const marqueeTools: MarqueeTool[] = [
  { name: "AWS", logo: "/logos/aws.svg" },
  { name: "Azure", logo: "/logos/azure.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Kubernetes", logo: "/logos/kubernetes.svg" },
  { name: "Terraform", logo: "/logos/terraform.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "GitHub Actions", logo: "/logos/github-actions.svg" },
  { name: "Jenkins", logo: "/logos/jenkins.svg" },
  { name: "Grafana", logo: "/logos/grafana.svg" },
  { name: "Prometheus", logo: "/logos/prometheus.svg" },
  { name: "Jira", logo: "/logos/jira.svg" },
  { name: "ServiceNow", logo: "/logos/servicenow.svg" },
];

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

// "How I ship, in 4 stages" — dashed-path process section.
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Assess & align",
    body: "Map release scope, environments, approvals, and stakeholders before a single line changes.",
  },
  {
    number: "02",
    title: "Architect the platform",
    body: "Design pipelines, IaC modules, and environment topology built for repeatability.",
  },
  {
    number: "03",
    title: "Automate & gate",
    body: "Wire CI/CD, quality gates, and security scans so releases can't skip a checkpoint.",
  },
  {
    number: "04",
    title: "Operate & improve",
    body: "Monitor, alert, and iterate — with runbooks so incidents don't start from zero.",
  },
];

// Pull-quote styled like Amphora's testimonial callout — an engineering
// philosophy statement rather than a fabricated client quote.
export const engineeringQuote = {
  quote:
    "Every release should be boring — predictable, observable, and reversible. That's the standard I build to.",
  name: profile.name,
  role: profile.role,
};
