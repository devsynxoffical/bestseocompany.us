import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTool, titleForPath, toolPages } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { AuditTool } from "@/components/pages/AuditTool";
import { ReportForm } from "@/components/pages/ReportForm";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import type { LeadType } from "@/lib/lead";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return toolPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getTool((await params).slug);
  if (!p) return {};
  return buildMetadata({ defaultImage: false, title: p.title, description: p.metaDescription, path: `/tools/${p.slug}`, keywords: [p.primaryKeyword, ...p.secondaryKeywords] });
}

const reportType: Record<string, { type: LeadType; cta: string; keywords?: boolean }> = {
  "backlink-checker": { type: "backlink-report", cta: "Get my backlink report" },
  "website-traffic-checker": { type: "traffic-report", cta: "Get my traffic report" },
  "seo-rank-checker": { type: "rank-report", cta: "Check my rankings", keywords: true },
};

const tones = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)"];

export default async function ToolPageView({ params }: Params) {
  const p = getTool((await params).slug);
  if (!p) notFound();
  const path = `/tools/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Free tools", path: "/tools" }, { name: p.name, path }];
  const isHub = p.slug === "free-seo-tools";
  const report = reportType[p.slug];
  const related = p.related
    .map((r) => titleForPath(r.startsWith("services/") ? `/${r}` : `/tools/${r}`))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const others = toolPages.filter((t) => t.slug !== "free-seo-tools" && t.slug !== p.slug);

  const toolUi = isHub ? (
    <div className="tool-hub">
      {others.map((t, i) => (
        <Link key={t.slug} href={`/tools/${t.slug}`} className="tool-tile" style={{ ["--tc" as string]: tones[i % 4] }} data-cursor="Open">
          <span className="tool-mode">{t.mode === "live" ? "● Live tool" : "✉ Free report"}</span>
          <b>{t.name}</b>
          <span>{t.intro.split(". ")[0]}.</span>
          <i aria-hidden="true">↗</i>
        </Link>
      ))}
    </div>
  ) : p.mode === "live" ? (
    <AuditTool />
  ) : report ? (
    <ReportForm type={report.type} cta={report.cta} withKeywords={report.keywords} />
  ) : null;

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(p.faqs),
          {
            "@context": "https://schema.org",
            "@type": isHub ? "CollectionPage" : "WebApplication",
            name: p.name,
            url: `${site.url}${path}`,
            description: p.metaDescription,
            ...(isHub ? {} : { applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }),
            publisher: { "@id": ORG_ID },
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={isHub ? "Free SEO tools" : p.mode === "live" ? "Free tool · runs instantly" : "Free tool · report by email"} h1={p.h1} intro={p.intro} color={p.color} wide />
      <section className="tool-stage">
        <div className="wrap">
          <Reveal className="tool-box" style={{ ["--pc" as string]: `var(--${p.color})` }}>{toolUi}</Reveal>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["How it works."]} />
          </div>
          <ol className="how3">
            {p.howItWorks.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i || undefined) as 1 | 2 | undefined}>
                <span className="how-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["What you get."]} />
          </div>
          <div className="cards3">
            {p.whatYouGet.map((d, i) => (
              <Reveal key={d.title} delay={((i % 3) || undefined) as 1 | 2 | undefined} className="icard" style={{ ["--tc" as string]: tones[i % 4] }}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap prose-wrap">
          {p.explainer.map((b) => (
            <Reveal key={b.heading} className="prose-block">
              <h2>{b.heading}</h2>
              {b.paragraphs.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </Reveal>
          ))}
        </div>
      </section>

      <FaqAccordion faqs={p.faqs} heading={`${p.name} questions.`} />
      <RelatedLinks heading="Keep going" items={related} />
    </main>
  );
}
