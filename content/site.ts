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

export const profile = {
  name: "Arun Kumar Bathini",
  initials: "AK",
  headline: "Arun Kumar Bathini",
  role: "Cloud DevOps Engineer",
  timezone: "CST",
  responseTime: "<24h",
  intro:
    "I design and run Salesforce CI/CD pipelines — DevOps Center, Vlocity/OmniStudio DataPacks, and GitHub Actions release automation — backed by deep AWS, Azure, and Kubernetes platform experience. Secure, observable, and built to scale.",
  about:
    "My work lives where releases, cloud platforms, and real production pressure meet. I like taking deployment paths that feel manual or scattered and turning them into systems teams can trust: clear pipelines, clean handoffs, visible checks, and reliable recovery. Across Salesforce, AWS, Azure, GitHub Actions, Terraform, containers, monitoring, Jira, and ServiceNow, I focus on making delivery calmer, faster, and easier to operate.",
  availability: "Available for Salesforce DevOps and cloud platform roles",
  resumeHref: "/Bathini-Arun-Kumar-DevOps-Resume.pdf",
  linkedin: "https://www.linkedin.com/in/arunbathiniab525/",
  email: "bathiniarunkumar525@gmail.com",
};

export const navLinks = [
  { href: "#experience", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "10", label: "Years in IT", tone: "blue" },
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
    title: "Salesforce DevOps",
    detail:
      "Built release workflows with Salesforce DevOps Center, GitHub Actions, Vlocity Build Tool, OmniStudio DataPacks, Copado/Gearset patterns, Jira, ServiceNow, CodeQL, and SonarQube quality gates.",
  },
  {
    number: "02",
    title: "Cloud Platform",
    detail:
      "Worked across AWS and Azure services including EC2, S3, Lambda, Route53, DynamoDB, API Gateway, AKS, ACR, Azure SQL, Cosmos DB, Key Vault, and Azure Functions.",
  },
  {
    number: "03",
    title: "CI/CD Automation",
    detail:
      "Designed pipelines for build, test, scan, release approval, deployment promotion, rollback support, and environment handoffs using GitHub Actions, Jenkins, Azure DevOps, GitLab, and scripting.",
  },
  {
    number: "04",
    title: "Production Reliability",
    detail:
      "Supported production operations with monitoring, alerting, incident response, logging, Prometheus, Grafana, CloudWatch, Docker, Kubernetes, Helm, and infrastructure as code controls.",
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
    body: "Moved teams off manual changesets onto Salesforce DevOps Center for core metadata and a Vlocity Build Tool + GitHub Actions track for OmniStudio DataPacks, with CodeQL, SonarQube, Jira, and ServiceNow release automation.",
    variant: "large",
    caseStudy: "devops-center-pipeline-recovery",
  },
  {
    number: "02",
    title: "Azure Kubernetes delivery platform",
    body: "Built delivery paths for AKS, Terraform, ARM templates, Helm, ACR, Azure SQL, Cosmos DB, Prometheus, and Grafana.",
    variant: "default",
  },
  {
    number: "03",
    title: "AWS migration and automation",
    body: "Supported EC2, S3, Lambda, Route53, DynamoDB, API Gateway, Jenkins, Ansible, Docker, Kubernetes, and CloudWatch.",
    variant: "dark",
  },
];

export type Job = {
  period: string;
  company: string;
  title: string;
  role: string;
  body: string;
};

export const experience: Job[] = [
  {
    period: "Sept 2021 — Present",
    company: "Lowe's",
    title: "Salesforce / AWS Cloud DevOps Engineer",
    role: "Lowe's — Salesforce / AWS Cloud DevOps Engineer",
    body: "GitHub Actions, Salesforce DevOps Center, Azure Key Vault, Terraform, Bicep, AWS, Docker, AKS, ServiceNow, Jira, and Python.",
  },
  {
    period: "Mar 2020 — Sept 2021",
    company: "Home Depot",
    title: "Azure DevOps Engineer",
    role: "Home Depot — Azure DevOps Engineer",
    body: "Azure Repos, AKS, ACR, ARM templates, Terraform, Azure SQL, Cosmos DB, Helm, Azure Functions, Prometheus, and Grafana.",
  },
  {
    period: "Jul 2018 — Feb 2020",
    company: "Urban Outfitters",
    title: "DevOps Engineer",
    role: "Urban Outfitters — DevOps Engineer",
    body: "Azure Pipelines, AKS, App Services, Event Hubs, Cosmos DB, Terraform modules, Azure Front Door, GitHub, Helm, and Databricks.",
  },
  {
    period: "Jun 2016 — Sept 2017",
    company: "HDFC Bank",
    title: "DevOps Engineer",
    role: "HDFC Bank — DevOps Engineer",
    body: "AWS Route53, Lambda, IAM, EC2, S3, DynamoDB, API Gateway, Redshift, Terraform, CloudFormation, Ansible, Jenkins, Docker, Kubernetes, and CloudWatch.",
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
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "Microsoft Azure Administrator",
    issuer: "Microsoft",
    year: "2023",
  },
];
