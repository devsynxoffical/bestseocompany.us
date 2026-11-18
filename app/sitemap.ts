import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { guidePages, industryPages, servicePages, toolPages } from "@/lib/pages";
import { blogPosts } from "@/lib/pages/blog-index";

const UPDATED = new Date("2026-11-18T12:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  type Freq = "weekly" | "monthly" | "yearly";
  const e = (path: string, priority: number, changeFrequency: Freq = "monthly", lastModified = UPDATED) => ({ url: `${site.url}${path}`, lastModified, changeFrequency, priority });
  return [
    e("", 1, "weekly"),
    e("/free-seo-audit", 0.9), e("/pricing", 0.9), e("/services", 0.9), e("/industries", 0.9),
    e("/about", 0.7), e("/contact", 0.7), e("/guides", 0.8), e("/blog", 0.8, "weekly"),
    ...servicePages.map((p) => e(`/services/${p.slug}`, 0.9)),
    ...industryPages.map((p) => e(`/industries/${p.slug}`, 0.8)),
    ...toolPages.map((p) => e(`/tools/${p.slug}`, p.slug === "seo-audit-tool" ? 0.9 : 0.7)),
    ...guidePages.map((p) => e(`/guides/${p.slug}`, 0.7)),
    ...blogPosts.map((p) => e(`/blog/${p.slug}`, 0.6, "monthly", new Date(`${p.date}T12:00:00Z`))),
    e("/site-map", 0.3, "monthly"), e("/editorial-policy", 0.3, "yearly"), e("/privacy", 0.2, "yearly"), e("/terms", 0.2, "yearly"),
  ];
}
