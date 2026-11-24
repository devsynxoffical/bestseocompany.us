import Link from "next/link";
import { gscResults } from "@/lib/results";

/**
 * Proof loop: an endless, CSS-only row of tilted "window" cards with real
 * Google Search Console reports. Hover or focus pauses it; reduced motion turns
 * it into a scrollable row. The second group is a decorative copy (aria-hidden).
 */
const TILTS = ["t-n2", "t-p2", "t-n1", "t-p1"] as const;
const COLORS = ["#ec4e3b", "#2b55e8", "#e37a38", "#4a9f5f", "#8c2fe2", "#e0a800"];

const items = gscResults.map((r, i) => ({
  key: r.id,
  tilt: TILTS[i % TILTS.length],
  color: COLORS[i % COLORS.length],
  tag: r.client,
  image: r.img,
  caption: r.period,
  stat: `${r.clicks} clicks`,
  alt: `Google Search Console performance report for a ${r.client.toLowerCase()}: ${r.clicks} clicks, ${r.impressions} impressions, ${r.ctr} CTR, average position ${r.position}`,
}));

function Card({ it, dup }: { it: (typeof items)[number]; dup: boolean }) {
  return (
    <div className={`pw ${it.tilt}`} style={{ ["--c" as string]: it.color }}>
      <div className="pw-c">
        <div className="pw-h">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="pw-tag"><i aria-hidden="true" />{it.tag}</span>
        </div>
        <div className="pw-s">
          <img src={it.image} alt={dup ? "" : it.alt} loading="lazy" decoding="async" />
          <span className="pw-g" aria-hidden="true" />
        </div>
        <div className="pw-f"><span>{it.caption}</span><b>{it.stat}</b></div>
      </div>
    </div>
  );
}

export function ProofLoop({ id = "results" }: { id?: string }) {
  return (
    <section className="pmq" id={id} aria-labelledby="pmq-h">
      <div className="pmq-glow" aria-hidden="true" />
      <div className="pmq-wrap pmq-hd">
        <div>
          <span className="pmq-eyb"><i aria-hidden="true" />Proof loop</span>
          <h2 id="pmq-h">Real Search Console reports, <em>on a loop.</em></h2>
        </div>
        <p>Google Search Console reports from client projects delivered by our partner agency, shared with permission. Client names are hidden. Hover any window to pause and look closer.</p>
      </div>
      <div className="pmq-tw">
        <div className="pmq-v l" aria-hidden="true" />
        <div className="pmq-v r" aria-hidden="true" />
        <div className="pmq-track" style={{ ["--spd" as string]: `${items.length * 7.5}s` }}>
          <div className="pmq-g">{items.map((it) => <Card key={it.key} it={it} dup={false} />)}</div>
          <div className="pmq-g" aria-hidden="true">{items.map((it) => <Card key={`d${it.key}`} it={it} dup />)}</div>
        </div>
      </div>
      <div className="pmq-wrap pmq-ft">
        <span>{items.length} Search Console reports</span>
        <span>Figures exactly as Google shows them</span>
        <span>Shared with permission</span>
        <Link className="pmq-btn" href="/results">
          See all results
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </section>
  );
}
