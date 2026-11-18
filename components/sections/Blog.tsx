import Link from "next/link";
import { posts } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

function Thumb({ art }: { art: (typeof posts)[number]["art"] }) {
  if (art === "card")
    return (
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <rect x="30" y="30" width="140" height="90" rx="14" fill="#fff" stroke="#111" strokeWidth="2" />
        <circle cx="62" cy="62" r="14" fill="#A2F27F" stroke="#111" strokeWidth="2" />
        <rect x="86" y="54" width="64" height="7" rx="3" fill="#111" />
        <rect x="86" y="68" width="44" height="6" rx="3" fill="#111" opacity=".35" />
        <rect x="48" y="92" width="104" height="8" rx="4" fill="#111" opacity=".15" />
      </svg>
    );
  if (art === "pin")
    return (
      <svg viewBox="0 0 200 150" aria-hidden="true">
        <path d="M100 22c-24 0-42 18-42 41 0 31 42 66 42 66s42-35 42-66c0-23-18-41-42-41z" fill="#fff" stroke="#111" strokeWidth="2.5" />
        <circle cx="100" cy="62" r="15" fill="#111" />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true">
      <g stroke="#111" strokeWidth="2.5" fill="#fff">
        <circle cx="100" cy="75" r="18" /><circle cx="46" cy="40" r="12" /><circle cx="154" cy="40" r="12" />
        <circle cx="46" cy="112" r="12" /><circle cx="154" cy="112" r="12" />
      </g>
      <g stroke="#111" strokeWidth="2.5">
        <line x1="56" y1="46" x2="84" y2="66" /><line x1="144" y1="46" x2="116" y2="66" />
        <line x1="56" y1="106" x2="84" y2="86" /><line x1="144" y1="106" x2="116" y2="86" />
      </g>
      <circle cx="100" cy="75" r="8" fill="#A2F27F" />
    </svg>
  );
}

/** Latest guides. */
export function Blog() {
  return (
    <section className="block" id="blog" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["Fresh from the blog."]} />
          <Reveal><Link className="btn ghost" href="/guides">All guides <span className="arrow" aria-hidden="true">↗</span></Link></Reveal>
        </div>
        <div className="posts">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i || undefined) as 1 | 2 | undefined}><Link className="post" href={p.href} data-cursor="Read">
              <div className="thumb" style={{ background: p.color }}><div className="in"><Thumb art={p.art} /></div></div>
              <div className="meta"><span>{p.tag}</span><span>{p.read}</span></div>
              <h3>{p.title}</h3>
            </Link></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
