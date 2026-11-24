import Link from "next/link";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { gscResults, RESULTS_DISCLOSURE, type GscResult } from "@/lib/results";

function ResultCard({ r, i, eager }: { r: GscResult; i: number; eager?: boolean }) {
  return (
    <Reveal as="figure" delay={((i % 3) || undefined) as 1 | 2 | undefined} className="gsc-card">
      <div className="gsc-shot">
        <img src={r.img} width={r.width} height={r.height} alt={`Google Search Console report for a ${r.client.toLowerCase()}: ${r.clicks} clicks and ${r.impressions} impressions over ${r.period.toLowerCase()}`} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
      <figcaption>
        <div className="gsc-top">
          <b>{r.client}</b>
          <span>{r.period}</span>
        </div>
        <dl className="gsc-kpis">
          <div><dt>Clicks</dt><dd>{r.clicks}</dd></div>
          <div><dt>Impressions</dt><dd>{r.impressions}</dd></div>
          <div><dt>CTR</dt><dd>{r.ctr}</dd></div>
          <div><dt>Avg. position</dt><dd>{r.position}</dd></div>
        </dl>
        {r.note && <p className="gsc-note">{r.note}</p>}
      </figcaption>
    </Reveal>
  );
}

/** Real Search Console results. `limit` shows the first N with a link to the full page. */
export function GscResults({ limit, heading = "Real Search Console results.", id = "results" }: { limit?: number; heading?: string; id?: string }) {
  const items = limit ? gscResults.slice(0, limit) : gscResults;
  return (
    <section className="block" id={id} style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={[heading]} />
          <Reveal as="p">{RESULTS_DISCLOSURE}</Reveal>
        </div>
        <div className="gsc-grid">
          {items.map((r, i) => <ResultCard key={r.id} r={r} i={i} />)}
        </div>
        {limit && (
          <Reveal className="gsc-more">
            <Link href="/results" className="btn">See all {gscResults.length} results <span className="arrow" aria-hidden="true">↗</span></Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
