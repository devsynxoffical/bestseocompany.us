import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export type RelatedItem = { href: string; label: string; kind: string; blurb?: string };

const tones = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)"];

export function RelatedLinks({ heading, items }: { heading: string; items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <section className="block" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head"><h2 className="rel-h">{heading}</h2></div>
        <div className="rel-grid">
          {items.map((it, i) => (
            <Reveal key={it.href} delay={(i ? Math.min(i, 4) : undefined) as 1 | 2 | 3 | 4 | undefined}>
              <Link href={it.href} className="rel-card" data-cursor="Open">
                <span className="rel-kind" style={{ background: tones[i % tones.length] }}>{it.kind}</span>
                <b>{it.label}</b>
                {it.blurb && <span className="rel-blurb">{it.blurb}</span>}
                <span className="rel-go" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
