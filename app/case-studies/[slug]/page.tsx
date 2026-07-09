import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import SiteHeader from "@/components/site-header";
import { getAllCaseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { profile } from "@/content/site";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} | ${profile.name}`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { content } = await compileMDX({
    source: study.content,
    options: { parseFrontmatter: false },
  });

  const related = getAllCaseStudies().filter((s) => s.slug !== slug);

  return (
    <div className="page">
      <SiteHeader />
      <main className="subpage-main">
        <article className="section case-study">
          <Link href="/case-studies" className="card-link case-study-back">
            ← All case studies
          </Link>
          <div className="section-heading">
            <p className="eyebrow">{study.role}</p>
            <h1>{study.title}</h1>
            <p className="case-study-summary">{study.summary}</p>
            <div className="case-study-meta">
              <time>{study.date}</time>
              <div className="case-study-stack">
                {study.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="case-study-body">{content}</div>
        </article>

        {related.length > 0 && (
          <section className="section case-study-related">
            <div className="section-heading">
              <p className="eyebrow">More</p>
              <h2>Other case studies</h2>
            </div>
            <div className="portfolio-grid">
              {related.map((s) => (
                <Link key={s.slug} href={`/case-studies/${s.slug}`} className="portfolio-card">
                  <span className="card-number">{s.role}</span>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="card-link">Read the case study →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
