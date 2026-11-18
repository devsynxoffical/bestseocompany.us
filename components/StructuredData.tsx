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
    logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
    image: `${site.url}/opengraph-image`,
    slogan: "Rank #1 with Best SEO Company.",
    areaServed: { "@type": "Country", name: "United States" },
    priceRange: "$1,500–$3,500+ per month",
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, areaServed: "US", availableLanguage: ["English"] },
    knowsAbout: ["Search engine optimization", "Local SEO", "Technical SEO", "Google Business Profile", "Link building", "Answer engine optimization", "Generative engine optimization", "E-commerce SEO", "Schema markup"],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
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
    inLanguage: "en-US",
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
