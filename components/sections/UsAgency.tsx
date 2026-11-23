import Link from "next/link";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    tag: "What's included",
    title: "Every SEO service, one team",
    body: "Technical SEO, local SEO and Google Business Profile, content, link building, e-commerce SEO and AI search visibility. You get one plan, one strategist and one report.",
    href: "/services",
    cta: "SEO services in the US",
    color: "var(--lav)",
  },
  {
    tag: "Who it's for",
    title: "Local businesses and national brands",
    body: "Contractors, plumbers, dentists, law firms and other local businesses that want calls from their area, plus stores and SaaS teams competing nationwide.",
    href: "/industries",
    cta: "Find your industry",
    color: "var(--pink)",
  },
  {
    tag: "How it's priced",
    title: "Published prices, no long contracts",
    body: "Plans start at $1,500 a month. There is a 90-day starting term, then everything is month to month. Every plan starts with a free 40-point audit.",
    href: "/pricing",
    cta: "Compare plans",
    color: "var(--lime)",
  },
];

/** Homepage section that answers "SEO agency in the USA" / "SEO services in the US" directly. */
export function UsAgency() {
  return (
    <section className="block" id="usa" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["An SEO agency in the USA, for US search."]} />
          <Reveal as="p">
            We only work in US search markets. Our strategists know how Google ranks local businesses state by state, how the map pack works in big metros and small towns, and what US buyers type before they call.
          </Reveal>
        </div>
        <div className="usa-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i || undefined) as 1 | 2 | undefined} className="usa-card">
              <span className="usa-tag" style={{ background: c.color }}>{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <Link href={c.href} className="usa-link">{c.cta} <span aria-hidden="true">→</span></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
