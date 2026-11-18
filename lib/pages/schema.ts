import { site } from "@/lib/content";
import type { FAQ } from "./types";

export const ORG_ID = `${site.url}/#organization`;

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = (opts: { name: string; description: string; path: string; serviceType: string; audience?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: `${site.url}${opts.path}`,
  serviceType: opts.serviceType,
  areaServed: { "@type": "Country", name: "United States" },
  provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: site.name, url: site.url },
  ...(opts.audience ? { audience: { "@type": "BusinessAudience", audienceType: opts.audience } } : {}),
});
