import type { CSSProperties } from "react";
import Link from "next/link";

/**
 * Proof loop (kit from RankEmpire): an endless, CSS-only row of tilted "app window"
 * cards with screenshots of recorded client calls. Hover or keyboard focus pauses it;
 * reduced motion turns it into a scrollable row. The second group is a decorative copy.
 * Captions describe what each screenshot shows. Do not label these as SEO results.
 */
type Item = { tilt: "t-n2" | "t-n1" | "t-p1" | "t-p2"; color: string; tag: string; image: string; caption: string; alt: string };

const ITEMS: Item[] = [
  { tilt: "t-n2", color: "#ec4e3b", tag: "Website review", image: "/proof/pf-anastasia.webp", caption: "Landing page walkthrough", alt: "Recorded client call reviewing a landing page on screen share" },
  { tilt: "t-p2", color: "#2b55e8", tag: "Strategy session", image: "/proof/pf-ann.webp", caption: "One-to-one strategy call", alt: "Recorded video call between a strategist and a client" },
  { tilt: "t-n1", color: "#e37a38", tag: "Report review", image: "/proof/pf-analytics.webp", caption: "Performance report walkthrough", alt: "Screen share of a performance report during a client call" },
  { tilt: "t-p1", color: "#4a9f5f", tag: "Group call", image: "/proof/pf-george.webp", caption: "Client team planning call", alt: "Recorded group video call with a client team" },
  { tilt: "t-n2", color: "#8c2fe2", tag: "Client check-in", image: "/proof/pf-edgar_jeermei.webp", caption: "Monthly check-in", alt: "Two clients on a recorded video call giving a thumbs up" },
  { tilt: "t-p2", color: "#e0a800", tag: "Onboarding call", image: "/proof/pf-guilia.webp", caption: "New client onboarding", alt: "Recorded onboarding video call with a client" },
  { tilt: "t-n1", color: "#ec4e3b", tag: "Client call", image: "/proof/pf-ig_shot.webp", caption: "Progress update", alt: "Client smiling on a recorded video call" },
  { tilt: "t-p1", color: "#2b55e8", tag: "Audience review", image: "/proof/pf-owne.webp", caption: "Audience insights walkthrough", alt: "Screen share of an audience insights report during a group call" },
  { tilt: "t-n2", color: "#e37a38", tag: "Planning call", image: "/proof/pf-sina.webp", caption: "Next-month planning", alt: "Recorded planning call with two clients" },
];

function Card({ it, dup }: { it: Item; dup: boolean }) {
  return (
    <div className={`pw ${it.tilt}`} style={{ "--c": it.color } as CSSProperties}>
      <div className="pw-c">
        <div className="pw-h">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="pw-tag"><i aria-hidden="true" />{it.tag}</span>
        </div>
        <div className="pw-s">
          <img src={it.image} alt={dup ? "" : it.alt} loading="lazy" decoding="async" />
          <span className="pw-g" aria-hidden="true" />
        </div>
        <div className="pw-f"><span>{it.caption}</span><b>Recorded call</b></div>
      </div>
    </div>
  );
}

export function ProofLoop() {
  return (
    <section className="pmq" id="client-sessions" aria-labelledby="pmq-h">
      <div className="pmq-glow" aria-hidden="true" />
      <div className="pmq-wrap pmq-hd">
        <div>
          <span className="pmq-eyb"><i aria-hidden="true" />Proof loop</span>
          <h2 id="pmq-h">Inside our client sessions, <em>on a loop.</em></h2>
        </div>
        <p>Recorded calls from real client work by our partner team, published with permission. Hover any window to pause and look closer.</p>
      </div>
      <div className="pmq-tw">
        <div className="pmq-v l" aria-hidden="true" />
        <div className="pmq-v r" aria-hidden="true" />
        <div className="pmq-track" style={{ "--spd": `${ITEMS.length * 7.5}s` } as CSSProperties}>
          <div className="pmq-g">{ITEMS.map((it) => <Card key={it.image} it={it} dup={false} />)}</div>
          <div className="pmq-g" aria-hidden="true">{ITEMS.map((it) => <Card key={`d${it.image}`} it={it} dup />)}</div>
        </div>
      </div>
      <div className="pmq-wrap pmq-ft">
        <span>{ITEMS.length} recorded sessions</span>
        <span>Real client calls</span>
        <span>Published with permission</span>
        <Link className="pmq-btn" href="/results">
          See our results
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </section>
  );
}
