import type { MetadataRoute } from "next";

const BASE = "https://your-domain.com"; // ← set your production URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), priority: 1 },
  ];
}
