import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";

/** Closing call to action with a spinning badge and drifting colour blobs. */
export function Cta() {
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal variant="clip" className="cta">
          <span className="blob b1" aria-hidden="true" />
          <span className="blob b2" aria-hidden="true" />
          <svg className="burst" viewBox="0 0 200 200" aria-hidden="true">
            <g className="ring">
              <path id="cta-circle" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" fill="none" />
              <text style={{ fontFamily: "var(--font-mono)" }} fontSize="15" letterSpacing="3" fill="#111">
                <textPath href="#cta-circle">GET FOUND ✳ GET CALLS ✳ GET GROWING ✳ </textPath>
              </text>
            </g>
            <circle cx="100" cy="100" r="36" fill="#111" />
            <path d="M86 112 L114 88 M96 88 H114 V106" stroke="#A2F27F" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
          <SplitText parts={["Let's get you to page one."]} />
          <div className="cta-row">
            <p>Book a 20-minute call. We&apos;ll look at your site live and tell you what&apos;s holding it back.</p>
            <MagneticLink href="#audit" arrow>Book my free call</MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
