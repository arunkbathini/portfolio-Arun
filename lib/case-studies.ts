import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CASE_DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyMeta = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  date: string;
};

export type CaseStudy = CaseStudyMeta & { content: string };

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_DIR)) return [];
  return fs
    .readdirSync(CASE_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(CASE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    role: data.role ?? "",
    stack: data.stack ?? [],
    date: data.date ?? "",
    content,
  };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return getCaseStudySlugs()
    .map((slug) => {
      const study = getCaseStudy(slug);
      if (!study) return null;
      return {
        slug: study.slug,
        title: study.title,
        summary: study.summary,
        role: study.role,
        stack: study.stack,
        date: study.date,
      } satisfies CaseStudyMeta;
    })
    .filter((s): s is CaseStudyMeta => s !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
