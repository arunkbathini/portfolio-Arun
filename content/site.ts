/*
  ── EDIT YOUR SITE HERE ──────────────────────────────────────────────
  Everything the page renders comes from this file. Change a job, a stat,
  a project, or a skill group here and the components update automatically.
  Nothing else needs editing for content changes.

  Positioning: AWS/Azure Cloud DevOps, Kubernetes, IaC, and CI/CD.
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
    "Cloud DevOps Engineer building repeatable AWS, Azure, Kubernetes, Salesforce, Terraform, Ansible, and quality-gated CI/CD delivery systems.",
  intro:
    "Cloud DevOps Engineer with 10+ years in IT, including 6+ years across AWS, Azure, Kubernetes, Terraform, Ansible, GitHub Actions, Jenkins, and CI/CD automation. Currently supporting Lowe's cloud delivery across AWS, Salesforce, Kubernetes, GitHub Actions, Terraform, and Amazon Connect.",
  about:
    "I build the cloud and delivery machinery that keeps production systems moving: CI/CD pipelines, container platforms, infrastructure as code, monitoring, patching, migrations, and release automation. My recent work spans AWS infrastructure, Amazon Connect, GitHub Actions, Salesforce Vlocity/OmniStudio deployment automation, Terraform, Ansible, Docker, Kubernetes, Splunk, Nagios, Python, and AWS CLI. I have also delivered Azure platforms with AKS, ACR, App Services, Azure Functions, Azure SQL, Cosmos DB, Key Vault, Front Door, Azure Monitor, Prometheus, and Grafana. Certified across Azure, AWS, and Kubernetes.",
  availability: "Open for Cloud DevOps, AWS DevOps, Azure DevOps, SRE, contract, and C2C engagements",
  resumeHref: "/Bathini-Arun-Kumar-Resume.docx",
  linkedin: "https://www.linkedin.com/in/arunbathiniab525/",
  email: "bathiniarunkumar525@gmail.com",
};

export const recruiterFit = [
  { label: "Target roles", value: "Cloud DevOps Engineer, AWS DevOps Engineer, Azure DevOps Engineer, SRE, Platform Engineering" },
  { label: "Core expertise", value: "AWS, Azure, Kubernetes, Terraform, Ansible, GitHub Actions, Jenkins, Salesforce Vlocity/OmniStudio" },
  { label: "Specialization", value: "Cloud infrastructure, CI/CD automation, container platforms, migrations, observability, production reliability" },
  { label: "Hiring signal", value: "AWS/Azure cloud delivery, CI/CD ownership, Salesforce deployment automation, monitoring, 24h response commitment" },
] as const;

export const impactMetrics = [
  { value: "10+", label: "Years driving enterprise IT transformation" },
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
  { value: "10+", label: "Years in IT", tone: "blue" },
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
    title: "AWS & Salesforce Cloud Delivery",
    detail:
      "Built Jenkins and GitHub Actions workflows for AWS, Kubernetes, and Salesforce deployments. Hands-on with EC2, VPC, IAM, S3, RDS, Lambda, Route 53, SQS, CloudFront, CloudFormation, AWS Config, Amazon Connect, Salesforce CLI, and Vlocity Build Tool.",
  },
  {
    number: "02",
    title: "Multi-Cloud Platform Engineering",
    detail:
      "Deep hands-on experience across AWS and Azure services including AKS, ACR, App Services, Azure SQL, Cosmos DB, Azure Functions, Key Vault, Front Door, Azure Monitor, EKS, ECR, RDS, Route 53, SQS, SNS, and CloudWatch.",
  },
  {
    number: "03",
    title: "Infrastructure Automation & IaC",
    detail:
      "Built and maintained Terraform and CloudFormation scripts for repeatable infrastructure. Created Ansible playbooks, roles, tasks, handlers, and templates for provisioning, patching, configuration management, and software deployment.",
  },
  {
    number: "04",
    title: "Production Reliability & Observability",
    detail:
      "Implemented monitoring and alerting with Prometheus, Grafana, CloudWatch, Azure Monitor, Splunk, Nagios, and DataDog. Managed Docker, Kubernetes, EKS, AKS, and OpenShift platforms for production delivery.",
  },
];

export const stack = [
  "AWS",
  "Azure",
  "Azure AKS",
  "GitHub Actions",
  "Salesforce",
  "Kubernetes",
  "Terraform",
  "CloudFormation",
  "Ansible",
  "Jenkins",
  "Python",
  "Go",
  "Grafana",
];

export type Project = {
  number: string;
  title: string;
  body: string;
  variant?: "large" | "dark" | "default";
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Lowe's cloud CI/CD and Salesforce automation",
    body: "Configured Jenkins Groovy pipelines and GitHub Actions workflows for AWS, Kubernetes, and Salesforce deployments. Automated Vlocity/OmniStudio DataPack releases with Salesforce CLI, Vlocity Build Tool, Azure Key Vault secrets, SonarQube, CodeQL, Microsoft Teams notifications, and reusable workflow templates.",
    variant: "large",
  },
  {
    number: "02",
    title: "Azure Kubernetes and app platform engineering",
    body: "Created and maintained AKS clusters, Azure Container Registry, App Services, Azure Functions, Azure SQL, Cosmos DB, Key Vault, Front Door, private endpoints, and Azure DevOps pipelines. Added Prometheus and Grafana alerting for CPU, memory, latency, and error-rate thresholds.",
    variant: "default",
  },
  {
    number: "03",
    title: "AWS infrastructure automation and reliability",
    body: "Automated AWS infrastructure and operations with Terraform, CloudFormation, AWS CLI, AWS Config, Ansible, Python, Shell scripts, IAM controls, S3 access policies, patch management, backup compliance, Splunk, Nagios, and production support practices.",
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
    period: "Jan 2023 — Present",
    company: "Lowe's",
    title: "Cloud DevOps Engineer",
    role: "Lowe's — Cloud DevOps Engineer",
    body: "Jenkins Groovy pipelines, GitHub Actions, AWS EC2, S3, Glacier, VPC, Lambda, Route 53, SQS, IAM, CloudFront, RDS, CloudFormation, Terraform, AWS Config, Amazon Connect, QuickSight, Salesforce CLI, Vlocity Build Tool, Azure Key Vault, SonarQube, CodeQL, Python, Splunk, and Nagios.",
    logo: "/company-logos/lowes.svg",
  },
  {
    period: "Sept 2021 — Jan 2023",
    company: "Home Depot",
    title: "Azure DevOps Engineer",
    role: "Home Depot — Azure DevOps Engineer",
    body: "Azure Repos, AKS, ACR, ARM templates, Terraform, Azure SQL, Cosmos DB, Helm, Azure Functions, Prometheus, and Grafana.",
    logo: "/company-logos/home-depot.svg",
  },
  {
    period: "Nov 2017 — June 2021",
    company: "HDFC Bank",
    title: "DevOps Engineer",
    role: "HDFC Bank — DevOps Engineer",
    body: "Azure Repos, Azure Pipelines, Storage Accounts, Active Directory, Cosmos DB, AKS, App Services, Event Hubs, Azure Functions, Application Insights, Azure Front Door, Terraform modules, Ansible playbooks, Prometheus, Grafana, Azure Blob Storage, and Databricks.",
    logo: "/company-logos/hdfc-bank.svg",
  },
  {
    period: "June 2016 — Sept 2017",
    company: "Selectsys",
    title: "DevOps Engineer",
    role: "Selectsys — DevOps Engineer",
    body: "AWS Route 53, SES, SQS, SNS, Lambda, IAM, EC2, S3, Redshift, Terraform, CloudFormation, Ansible, Jenkins, Docker Compose, PowerShell, Shell scripts, Linux, VMware, and build/release automation.",
  },
];

export type SkillGroup = { title: string; items: string };

export const skillGroups: SkillGroup[] = [
  { title: "AWS Services", items: "EC2, EKS, ECR, RDS, VPC, IAM, Lambda, CloudFormation, S3, EBS, ELB, Auto Scaling, Route 53, SQS, SNS, CloudWatch, WAF" },
  { title: "Azure Services", items: "AKS, ACR, App Services, Key Vault, Azure Functions, Blob Storage, Azure AD, Service Bus, Azure SQL, Cosmos DB, Front Door, Azure Monitor" },
  { title: "CI/CD", items: "GitHub Actions, Jenkins, Azure DevOps, GitLab, CircleCI" },
  { title: "Salesforce Delivery", items: "Salesforce CLI, Vlocity Build Tool, OmniStudio DataPacks, FlexCards, OmniScripts, Integration Procedures, DataRaptors" },
  { title: "IaC & Automation", items: "Terraform, CloudFormation, Ansible, AWS CLI, Python, Shell scripting, Go" },
  { title: "Containers", items: "Docker, Kubernetes, Amazon EKS, Azure AKS, OpenShift" },
  { title: "Monitoring & Workflows", items: "CloudWatch, CloudTrail, Azure App Insights, Azure Monitor, Prometheus, Grafana, Splunk, Nagios, DataDog, Jira, ServiceNow, Azure Boards" },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    name: "Certified Azure Administrator Associate",
    issuer: "Microsoft",
    year: "Active",
  },
  {
    name: "Certified AWS Developer Associate",
    issuer: "Amazon Web Services",
    year: "Active",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    year: "Active",
  },
];

export type MarqueeTool = { name: string; logo: string };

// Tools & platforms — rendered as a scrolling marquee logo strip.
export const marqueeTools: MarqueeTool[] = [
  { name: "AWS", logo: "/logos/aws.svg" },
  { name: "Azure", logo: "/logos/azure.svg" },
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
