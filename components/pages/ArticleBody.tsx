import Link from "next/link";
import type { GuideSection } from "@/lib/pages/types";
import { TocSpy } from "./TocSpy";
import { Reveal } from "@/components/ui/Reveal";
import { PreferredSourceCallout } from "@/components/ui/PreferredSource";

export const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Two-column article layout: sticky table of contents + takeaways, sections, tables and code. */
export function ArticleBody({ takeaways, sections, followCta = true }: { takeaways: string[]; sections: GuideSection[]; followCta?: boolean }) {
  const toc = sections.map((s) => ({ id: anchor(s.heading), label: s.heading }));
  return (
    <div className="wrap g-body">
      <aside className="g-side">
        <TocSpy items={toc} />
        <div className="g-side-cta">
          <b>Free SEO audit</b>
          <p>See how your site scores in under a minute.</p>
          <Link href="/tools/seo-audit-tool" className="btn">Run the audit <span className="arrow" aria-hidden="true">↗</span></Link>
        </div>
      </aside>
      <article className="g-article">
        <Reveal className="g-takeaways">
          <b>Key takeaways</b>
          <ul>{takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
        </Reveal>
        {sections.map((s) => (
          <section key={s.heading} id={anchor(s.heading)} className="g-sec">
            <h2>{s.heading}</h2>
            {s.paragraphs.map((t, i) =>
              t.trim().startsWith("{") || t.includes('"@context"') ? (
                <pre key={i} className="g-code"><code>{t}</code></pre>
              ) : (
                <p key={i}>{t}</p>
              ),
            )}
            {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            {s.table && (
              <div className="g-table">
                <table>
                  <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>{s.table.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => (ci === 0 ? <th key={ci} scope="row">{c}</th> : <td key={ci}>{c}</td>))}</tr>)}</tbody>
                </table>
              </div>
            )}
          </section>
        ))}
        {followCta && <PreferredSourceCallout />}
      </article>
    </div>
  );
}
