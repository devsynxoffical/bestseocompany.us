import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { site } from "@/lib/content";
import { breadcrumbSchema, ORG_ID } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { ContactForm } from "@/components/pages/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Best SEO Company",
  description: "Talk to a Best SEO Company strategist about local, technical or AI search SEO. Send a message or request a free 40-point SEO audit of your website.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Best SEO Company", url: `${site.url}/contact`, about: { "@id": ORG_ID } }]} />
      <PageHero crumbs={crumbs} eyebrow="Contact" h1="Talk to a strategist." intro="Tell us about your business and goals. A senior strategist reads every message and replies by email." color="lime" wide />
      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap contact-grid">
          <Reveal className="tool-box" style={{ ["--pc" as string]: "var(--lime)" }}><ContactForm /></Reveal>
          <Reveal variant="right" className="contact-side">
            <div><span className="label">Email</span><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
            <div><span className="label">Hours</span><p>{site.hours}</p></div>
            <div><span className="label">Prefer a quick answer?</span><p><Link href="/tools/seo-audit-tool">Run our free audit tool</Link> or <Link href="/free-seo-audit">request a full 40-point audit</Link>.</p></div>
            <div><span className="label">Where we work</span><p>We work with businesses across the United States, remotely.</p></div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
