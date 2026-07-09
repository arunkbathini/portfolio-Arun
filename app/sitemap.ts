import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudiesDir = path.join(process.cwd(), "content/case-studies");
  const slugs = fs
    .readdirSync(caseStudiesDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/case-studies/${slug}`,
      lastModified: new Date(),
      priority: 0.5,
    })),
  ];
}
