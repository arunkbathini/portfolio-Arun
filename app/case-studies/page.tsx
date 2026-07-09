import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import { getAllCaseStudies } from "@/lib/case-studies";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: `Case Studies | ${profile.name}`,
  description: "Detailed write-ups of release engineering and DevOps incidents.",
};

export default function CaseStudiesIndex() {
  const studies = getAllCaseStudies();

  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Case Studies</p>
            <h1>Write-ups from the work itself.</h1>
          </div>
          <div className="portfolio-grid case-study-grid">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="portfolio-card"
                data-analytics-event="case_study_open"
                data-analytics-label={study.title}
              >
                <span className="card-number">{study.role}</span>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <span className="card-link">Read the case study →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
