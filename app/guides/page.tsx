import type { Metadata } from "next";
import Link from "next/link";
import { guidePages } from "@/lib/pages";
import { breadcrumbSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: { absolute: "SEO Guides: Straight Answers to SEO Questions | Best SEO Company" },
  description: "Plain-English answers to the SEO questions business owners ask most: costs, strategy, tools, keyword research, link building, rankings and AI search.",
  alternates: { canonical: "/guides" },
};

const tones = ["lav", "pink", "lime", "taupe"];

export default function GuidesHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }];
  const cats = [...new Set(guidePages.map((g) => g.category))];
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={`${guidePages.length} guides`} h1="Straight answers to SEO questions." intro="No jargon and no hype. Each guide starts with a short answer, then goes as deep as you need." color="lime" wide />
      {cats.map((c) => (
        <section key={c} className="block" style={{ paddingTop: 10, paddingBottom: 40 }}>
          <div className="wrap">
            <h2 className="rel-h" style={{ marginBottom: 20 }}>{c}</h2>
            <div className="dir-grid">
              {guidePages.filter((g) => g.category === c).map((g, i) => (
                <Reveal key={g.slug} delay={((i % 4) || undefined) as 1 | 2 | 3 | undefined}>
                  <Link href={`/guides/${g.slug}`} className="dir-card" style={{ ["--tc" as string]: `var(--${tones[i % 4]})` }} data-cursor="Read">
                    <span className="dir-cat">{g.readMinutes} min read</span>
                    <b>{g.question}</b>
                    <span className="dir-blurb">{g.answer.split(". ")[0]}.</span>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <LeadBand heading="Prefer to talk it through?" copy="Send us your website and a strategist will answer your questions with your actual data." />
    </main>
  );
}
