import { testimonials } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

/** Endless, hover-to-pause row of client quotes. The list renders twice for a seamless loop. */
export function Testimonials() {
  return (
    <section className="block">
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["What clients say."]} />
          <Reveal as="span" className="placeholder-note">Sample quotes, replace with real client reviews</Reveal>
        </div>
      </div>
      <Reveal variant="blur" className="tq">
        <div className="tq-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure key={i} className={`quote ${t.tone}`} aria-hidden={i >= testimonials.length ? true : undefined}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="who">
                <span className="av" aria-hidden="true">{t.initials}</span>
                <span><b>{t.name}</b><span>{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
