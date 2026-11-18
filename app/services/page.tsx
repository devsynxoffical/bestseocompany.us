import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { servicePages } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "SEO Services | Local, Technical, AEO & More | Best SEO Company",
  description: "Every SEO service we offer: local SEO, technical SEO, e-commerce and Shopify SEO, link building, AEO and GEO for AI search, consulting and packages.",
  path: "/services",
});

export default function ServicesHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={`${servicePages.length} services`} h1="Every way we grow your search traffic." intro="Pick one service or combine them into a plan. Every engagement starts with a free audit, so we only recommend what your site actually needs." color="pink" wide />
      <section className="block" style={{ paddingTop: 20 }}>
        <div className="wrap dir-grid">
          {servicePages.map((s, i) => (
            <Reveal key={s.slug} delay={((i % 4) || undefined) as 1 | 2 | 3 | undefined}>
              <Link href={`/services/${s.slug}`} className="dir-card" style={{ ["--tc" as string]: `var(--${s.color})` }} data-cursor="Open">
                <span className="dir-cat">Service</span>
                <b>{s.name}</b>
                <span className="dir-blurb">{s.intro.split(". ")[0]}.</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <LeadBand heading="Not sure which service you need?" copy="Start with a free audit. We'll tell you which two or three things will make the biggest difference." />
    </main>
  );
}
