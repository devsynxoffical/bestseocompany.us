import Link from "next/link";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { gscResults, RESULTS_DISCLOSURE, type GscResult } from "@/lib/results";
import { caseSlugForResult } from "@/lib/case-studies";

/** One result per row: the full Search Console screenshot beside its numbers. */
function ResultCard({ r, n }: { r: GscResult; n: number }) {
  return (
    <Reveal as="figure" className={`gsc-card${n % 2 === 0 ? " flip" : ""}`}>
      <div className="gsc-shot">
        <img src={r.img} width={r.width} height={r.height} alt={`Google Search Console report for a ${r.client.toLowerCase()}: ${r.clicks} clicks and ${r.impressions} impressions over ${r.period.toLowerCase()}`} loading="lazy" decoding="async" />
      </div>
      <figcaption>
        <span className="gsc-num">Result {String(n).padStart(2, "0")}</span>
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
        {caseSlugForResult(r.id) && <Link href={`/results/${caseSlugForResult(r.id)}`} className="gsc-cs">Read the case study <span aria-hidden="true">→</span></Link>}
      </figcaption>
    </Reveal>
  );
}

/**
 * Real Search Console results, each shown on its own.
 * `ids` picks specific reports (in that order) and adds a link to the full results page.
 */
export function GscResults({ ids, heading = "Real Search Console results.", id = "results" }: { ids?: string[]; heading?: string; id?: string }) {
  const items = ids ? ids.map((x) => gscResults.find((r) => r.id === x)).filter((r): r is GscResult => !!r) : gscResults;
  return (
    <section className="block" id={id} style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={[heading]} />
          <Reveal as="p">{RESULTS_DISCLOSURE}</Reveal>
        </div>
        <div className="gsc-list">
          {items.map((r, i) => <ResultCard key={r.id} r={r} n={i + 1} />)}
        </div>
        {ids && (
          <Reveal className="gsc-more">
            <Link href="/results" className="btn">See all {gscResults.length} case studies <span className="arrow" aria-hidden="true">↗</span></Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
