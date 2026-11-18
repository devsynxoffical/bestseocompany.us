import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { guidePages, industryPages, servicePages, toolPages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9), entry("/industries", 0.9), entry("/guides", 0.8),
    ...servicePages.map((p) => entry(`/services/${p.slug}`, 0.9)),
    ...industryPages.map((p) => entry(`/industries/${p.slug}`, 0.8)),
    ...toolPages.map((p) => entry(`/tools/${p.slug}`, p.slug === "seo-audit-tool" ? 0.9 : 0.7)),
    ...guidePages.map((p) => entry(`/guides/${p.slug}`, 0.7)),
  ];
}
