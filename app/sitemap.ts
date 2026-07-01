import type { MetadataRoute } from "next";

const BASE = "https://your-domain.com"; // ← set your production URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/experience`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/certifications`, lastModified: new Date(), priority: 0.85 },
    { url: `${BASE}/contact`, lastModified: new Date(), priority: 0.9 },
  ];
}
