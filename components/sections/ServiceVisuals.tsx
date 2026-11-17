"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/lib/content";

const gauges = [
  { score: 96, label: "PERFORMANCE", offset: 12, color: "#A2F27F" },
  { score: 100, label: "SEO", offset: 0, color: "#A2F27F" },
  { score: 92, label: "ACCESS.", offset: 16, color: "#A99BFB" },
];

function AuditVisual() {
  return (
    <div className="visual" aria-hidden="true">
      <div className="vbar"><i /><i /><i />&nbsp; site-audit / yourwebsite.com</div>
      <div className="vitals">
        {gauges.map((g) => (
          <div className="gauge" key={g.label}>
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#2B2B28" strokeWidth="8" />
              <circle className="arc" cx="40" cy="40" r="32" fill="none" stroke={g.color} strokeWidth="8" strokeLinecap="round" strokeDasharray="201" strokeDashoffset={g.offset} transform="rotate(-90 40 40)" />
            </svg>
            <b>{g.score}</b>
            <span>{g.label}</span>
          </div>
        ))}
      </div>
      <div className="checks">
        <div><span>LCP 1.8s</span><span className="ok">PASS</span></div>
        <div><span>INP 120ms</span><span className="ok">PASS</span></div>
        <div><span>CLS 0.02</span><span className="ok">PASS</span></div>
        <div><span>412 broken links redirected</span><span className="ok">FIXED</span></div>
      </div>
    </div>
  );
}

const query = "best emergency plumber near me";

function SerpVisual({ active }: { active: boolean }) {
  const [typed, setTyped] = useState(query);
  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    setTyped("");
    const id = setInterval(() => {
      n++;
      setTyped(query.slice(0, n));
      if (n >= query.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="visual" aria-hidden="true">
      <div className="vsearch"><span className="typing">{typed}</span><span>⌕</span></div>
      <div className="result you">
        <span className="u">yourwebsite.com › emergency-plumbing</span>
        <span className="t">24/7 Emergency Plumber in Austin, TX</span>
        <span className="d">Licensed plumbers on site in 60 minutes. Upfront pricing, no overtime fees…</span>
      </div>
      <div className="result">
        <span className="u">competitor-one.com › services</span>
        <span className="t">Plumbing Services | Competitor One</span>
        <span className="d">We offer a wide range of plumbing services for homes…</span>
      </div>
      <div className="result">
        <span className="u">directory-site.com › austin › plumbers</span>
        <span className="t">Top 10 Plumbers in Austin (2026)</span>
        <span className="d">Compare ratings and reviews of local plumbers…</span>
      </div>
      <span className="badge">POSITION 1</span>
    </div>
  );
}

function MapVisual() {
  return (
    <div className="visual" aria-hidden="true">
      <div className="vbar"><i /><i /><i />&nbsp; map pack / &quot;dentist near me&quot;</div>
      <div className="map">
        <span className="pin o" style={{ left: "18%", top: "26%" }}><b>3</b></span>
        <span className="pin o" style={{ left: "66%", top: "58%" }}><b>2</b></span>
        <span className="pin me" style={{ left: "44%", top: "34%" }}><b>1</b></span>
      </div>
      <div className="pack">
        <div className="me"><span>Your Dental Studio</span><span className="stars">★ 4.9 · 612 reviews</span></div>
        <div><span>Lakeside Family Dental</span><span className="stars">★ 4.6 · 210</span></div>
        <div><span>Downtown Smiles</span><span className="stars">★ 4.4 · 98</span></div>
      </div>
    </div>
  );
}

const you = "M0 196 L36 190 L72 181 L109 170 L145 152 L181 140 L218 120 L254 103 L290 84 L327 66 L363 48 L400 30";

function LinksVisual() {
  return (
    <div className="visual" aria-hidden="true">
      <div className="vbar"><i /><i /><i />&nbsp; referring domains, last 12 months</div>
      <div className="legend">
        <span><i style={{ background: "#A2F27F" }} />You</span>
        <span><i style={{ background: "#5A5A55" }} />Top competitor</span>
      </div>
      <div className="chart">
        <svg viewBox="0 0 400 220" preserveAspectRatio="none">
          <g stroke="#2B2B28" strokeWidth="1">
            <line x1="0" y1="55" x2="400" y2="55" />
            <line x1="0" y1="110" x2="400" y2="110" />
            <line x1="0" y1="165" x2="400" y2="165" />
          </g>
          <path d="M0 150 L36 148 L72 146 L109 143 L145 142 L181 140 L218 137 L254 136 L290 133 L327 131 L363 129 L400 127" fill="none" stroke="#5A5A55" strokeWidth="3" />
          <path d={`${you} L400 220 L0 220Z`} fill="#A2F27F" fillOpacity=".14" />
          <path className="line" pathLength={1} strokeDasharray="1" d={you} fill="none" stroke="#A2F27F" strokeWidth="3.5" />
          <circle cx="396" cy="30" r="6" fill="#A2F27F" />
        </svg>
      </div>
      <div className="checks"><div><span>New referring domains</span><span className="ok">+284</span></div></div>
    </div>
  );
}

export function ServiceVisual({ type, active }: { type: Service["visual"]; active: boolean }) {
  switch (type) {
    case "audit": return <AuditVisual />;
    case "serp": return <SerpVisual active={active} />;
    case "map": return <MapVisual />;
    case "links": return <LinksVisual />;
  }
}
