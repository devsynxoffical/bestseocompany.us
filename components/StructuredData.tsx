import { faqs, site } from "@/lib/content";

/** JSON-LD for the agency and the FAQ, so search engines can show rich results. */
export function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    foundingDate: String(site.foundedYear),
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: ["Search engine optimization", "Technical SEO", "Local SEO", "Content marketing", "Link building"],
    openingHours: "Mo-Fr 09:00-18:00",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is static, built from our own content file
      dangerouslySetInnerHTML={{ __html: JSON.stringify([org, website, faq]).replace(/</g, "\\u003c") }}
    />
  );
}
