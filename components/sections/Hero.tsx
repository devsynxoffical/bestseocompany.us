"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cx, easeOutCubic } from "@/lib/utils";
import { submitLead } from "@/lib/lead";

/* ------------------------------------------------------------------------- *
 * "Built live by SEO agents" hero.
 *
 * On load, a swarm of named cursors constructs the hero in front of the
 * visitor: each layer gets a selection box that grows from 0 × 0 to its real
 * size (with a live size label), headline rows slide in as they're drawn, the
 * intro paragraph is typed, the form is assembled by a cluster of agents and
 * the stat stickers are dragged into place. A status bar shows progress and
 * offers Skip / Replay.
 *
 * Content is fully server-rendered. A tiny inline script in app/layout.tsx adds
 * `hero-build` to <html> before paint (unless reduced motion is on) so the
 * layers start hidden; if hydration never happens it removes the class again.
 * ------------------------------------------------------------------------- */

type Rect = { x: number; y: number; w: number; h: number };
type Box = Rect & { id: string; grow: boolean; dur: number; t0: number };
type Cursor = { x: number; y: number; dur: number; show: boolean; click: boolean };

const AGENTS = [
  { name: "Crawler", color: "#A99BFB" },
  { name: "Indexer", color: "#7CC8FF" },
  { name: "Writer", color: "#F9A8EC" },
  { name: "Ranker", color: "#A2F27F" },
  { name: "Schema", color: "#FFB86B" },
  { name: "Linker", color: "#FF8A7A" },
  { name: "Mapper", color: "#6FE3C1" },
  { name: "Auditor", color: "#FFE066" },
  { name: "Tracker", color: "#C9B6FF" },
] as const;
type AgentName = (typeof AGENTS)[number]["name"];

const EASE = "cubic-bezier(.5,0,.2,1)";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const total = useRef(1);
  const allKeys = useRef<string[]>([]);

  const [phase, setPhase] = useState<"idle" | "run" | "fade" | "done">("idle");
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [typed, setTyped] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const [drag, setDrag] = useState<Record<number, { dx: number; dy: number }>>({});
  const [layers, setLayers] = useState(0);
  const [tag, setTag] = useState<{ x: number; y: number; w: number } | null>(null);
  const [buildTime, setBuildTime] = useState(0);
  const [barOpen, setBarOpen] = useState(true);
  const [inView, setInView] = useState(true);
  const [mini, setMini] = useState(false);

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };
  const at = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, Math.max(0, ms)));
  };

  /* ---------------------------- the build script --------------------------- */
  const run = useCallback(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    clearTimers();

    const hr = heroEl.getBoundingClientRect();
    const W = hr.width, H = hr.height;
    const q = (sel: string) => heroEl.querySelector(sel);
    const rel = (el: Element | null): Rect | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      return { x: r.left - hr.left, y: r.top - hr.top, w: r.width, h: r.height };
    };

    const pill = rel(q('[data-build="pill"] .pill'));
    const rows = [0, 1, 2].map((i) => rel(q(`[data-build="r${i}"] > span`)));
    const hl = rel(q(".hero h1 .hl"));
    const serp = rel(q(".hero h1 .serp"));
    const copy = rel(q('[data-build="copy"]'));
    const form = rel(q('[data-build="form"] .audit'));
    const stickers = [0, 1, 2].map((i) => rel(q(`[data-build="stk${i}"]`)));

    setOn({});
    setTyped(0);
    setBoxes([]);
    setLayers(0);
    setDrag({});
    setMini(false);
    setPhase("run");
    setTag(pill ? { x: pill.x, y: Math.max(8, pill.y - 34), w: Math.round(W) } : null);

    // Cursors start just outside the hero edges.
    const start: Record<string, Cursor> = {};
    AGENTS.forEach((a, i) => {
      const side = i % 4;
      start[a.name] = {
        x: side === 0 ? -40 : side === 1 ? W + 20 : ((i * 173) % Math.max(1, W - 80)) + 40,
        y: side === 2 ? -40 : side === 3 ? H + 20 : ((i * 97) % Math.max(1, H - 80)) + 40,
        dur: 0,
        show: true,
        click: false,
      };
    });
    setCursors(start);

    const move = (name: AgentName, x: number, y: number, ms: number, dur = 600) =>
      at(ms, () => setCursors((c) => ({ ...c, [name]: { ...c[name], x, y, dur } })));
    const click = (name: AgentName, ms: number) => {
      at(ms, () => setCursors((c) => ({ ...c, [name]: { ...c[name], click: true } })));
      at(ms + 240, () => setCursors((c) => ({ ...c, [name]: { ...c[name], click: false } })));
    };
    const keys: string[] = [];
    const reveal = (key: string, ms: number) => {
      keys.push(key);
      at(ms, () => {
        setOn((o) => ({ ...o, [key]: true }));
        setLayers((l) => l + 1);
      });
    };
    const grow = (id: string, r: Rect, ms: number, dur: number, agent?: AgentName) => {
      at(ms, () => setBoxes((b) => [...b, { id, ...r, grow: false, dur, t0: 0 }]));
      at(ms + 30, () => setBoxes((b) => b.map((x) => (x.id === id ? { ...x, grow: true, t0: performance.now() } : x))));
      if (agent) {
        move(agent, r.x, r.y, ms - 520, 480);
        move(agent, r.x + r.w, r.y + r.h, ms + 30, dur);
      }
    };

    // 1. Badge pill
    if (pill) { grow("pill", pill, 250, 480, "Auditor"); reveal("pill", 780); }

    // 2. Headline rows, drawn by two agents taking turns
    rows.forEach((r, i) => {
      if (!r) return;
      const ms = 700 + i * 430;
      grow(`r${i}`, r, ms, 560, i % 2 ? "Indexer" : "Crawler");
      reveal(`r${i}`, ms + 600);
    });

    // 3. Ranker clicks the highlight, then the #1 badge
    if (hl) { move("Ranker", hl.x + hl.w * 0.55, hl.y + hl.h * 0.55, 1700, 650); click("Ranker", 2400); reveal("hl", 2420); }
    if (serp) { move("Ranker", serp.x + serp.w * 0.5, serp.y + serp.h * 0.6, 2560, 520); click("Ranker", 3120); reveal("serp", 3140); }

    // 4. Paragraph box, then Writer types it
    if (copy) {
      grow("copy", copy, 2150, 520, "Writer");
      reveal("copy", 2700);
      const len = hero.copy.length, typeStart = 2720, typeDur = 1400;
      for (let k = 1; k <= 28; k++) at(typeStart + (typeDur * k) / 28, () => setTyped(Math.round((len * k) / 28)));
      move("Writer", copy.x + copy.w * 0.82, copy.y + copy.h - 6, typeStart, typeDur);
    }

    // 5. Form, assembled by a swarm
    if (form) {
      grow("form", form, 2900, 560, "Linker");
      const bx = form.x + form.w - 120, by = form.y + form.h / 2;
      (["Schema", "Mapper", "Tracker", "Auditor", "Indexer", "Crawler"] as AgentName[]).forEach((name, k) => {
        move(name, bx + ((k * 37) % 90) - 45, by + ((k * 23) % 40) - 18, 3000 + k * 70, 650);
        click(name, 3700 + k * 60);
      });
      reveal("form", 3560);
    }

    // 6. Stickers dragged in from below-left
    const draggers: AgentName[] = ["Mapper", "Schema", "Tracker"];
    stickers.forEach((s, i) => {
      if (!s) return;
      const ms = 3950 + i * 320, dx = -170, dy = 130;
      at(ms, () => setDrag((d) => ({ ...d, [i]: { dx, dy } })));
      reveal(`stk${i}`, ms);
      move(draggers[i], s.x + dx + 24, s.y + dy + 22, ms - 420, 380);
      at(ms + 70, () => setDrag((d) => ({ ...d, [i]: { dx: 0, dy: 0 } })));
      move(draggers[i], s.x + 24, s.y + 22, ms + 70, 650);
      click(draggers[i], ms + 760);
    });

    total.current = Math.max(1, keys.length);
    allKeys.current = keys;
    const end = stickers.some(Boolean) ? 5300 : 4300;

    // 7. Wrap up: overlays fade, agents leave
    at(end, () => {
      setPhase("fade");
      setBuildTime(end / 1000);
      setCursors((c) => {
        const next = { ...c };
        AGENTS.forEach((a, i) => {
          next[a.name] = { ...next[a.name], x: i % 2 ? W + 40 : -40, y: ((i * 131) % Math.max(1, H - 60)) + 30, dur: 900 };
        });
        return next;
      });
    });
    at(end + 900, () => {
      setBoxes([]);
      setTyped(null);
      setPhase("done");
    });
    at(end + 4500, () => setMini(true));
  }, []);

  /** Jump straight to the finished hero. */
  const skip = () => {
    clearTimers();
    setOn(Object.fromEntries(allKeys.current.map((k) => [k, true])));
    setLayers(total.current);
    setTyped(null);
    setDrag({});
    setBoxes([]);
    setPhase("done");
    at(2500, () => setMini(true));
  };

  // Start on mount (after fonts so measurements are final).
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.heroReady = "1";
    if (prefersReducedMotion() || !root.classList.contains("hero-build")) {
      setPhase("done");
      return;
    }
    let cancelled = false;
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => !cancelled && requestAnimationFrame(run));
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [run]);

  // Live "W × H" size labels while boxes grow.
  useEffect(() => {
    if (phase !== "run") return;
    let id = 0;
    const tick = () => {
      overlayRef.current?.querySelectorAll<HTMLElement>(".hb-size").forEach((el) => {
        const t0 = Number(el.dataset.t0), dur = Number(el.dataset.dur);
        const p = t0 ? Math.min(1, (performance.now() - t0) / dur) : 0;
        const e = easeOutCubic(p);
        el.textContent = `${Math.round(Number(el.dataset.w) * e)} × ${Math.round(Number(el.dataset.h) * e)}`;
      });
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [phase]);

  // Only show the status bar while the hero is on screen.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ----------------------------- mouse parallax ---------------------------- */
  const stickerWrap = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!stickerWrap.current || !hasFinePointer() || prefersReducedMotion()) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    stickerWrap.current.querySelectorAll<HTMLElement>(".sticker").forEach((s) => {
      const d = Number(s.dataset.depth);
      s.style.setProperty("--mx", `${x * d}px`);
      s.style.setProperty("--my", `${y * d}px`);
    });
  };

  const building = phase === "run" || phase === "fade";
  const built = phase === "done" || phase === "fade";
  const progress = Math.min(1, layers / total.current);

  return (
    <section className={cx("hero", built && "built", building && "building")} ref={heroRef} onMouseMove={onMove}>
      <div className="wrap">
        <div className={cx("hero-top", on.pill && "on")} data-build="pill">
          <span className="pill">
            <span className="dot" aria-hidden="true">★</span> {hero.badge}
          </span>
        </div>
        <h1>
          <span className={cx("row", on.r0 && "on")} data-build="r0">
            <span>Rank <span className={cx("serp", on.serp && "on")}>#1</span> with</span>
          </span>{" "}
          <span className={cx("row", on.r1 && "on")} data-build="r1">
            <span><span className={cx("hl", on.hl && "on")}>Best SEO</span></span>
          </span>{" "}
          <span className={cx("row", on.r2 && "on")} data-build="r2">
            <span>Company.</span>
          </span>
        </h1>
        <div className="hero-grid">
          <p className={cx("hero-copy", on.copy && "on")} data-build="copy">
            {typed === null ? (
              hero.copy
            ) : (
              <>
                {hero.copy.slice(0, typed)}
                <span className="hb-caret" aria-hidden="true" />
                <span className="hb-ghost">{hero.copy.slice(typed)}</span>
              </>
            )}
          </p>
          <div id="audit" className={cx(on.form && "on")} data-build="form">
            <AuditForm />
          </div>
        </div>
      </div>

      <div className="stickers" ref={stickerWrap} aria-hidden="true">
        {hero.stickers.map((s, i) => (
          <div
            key={s.label}
            className={cx("sticker", s.className, on[`stk${i}`] && "on")}
            data-build={`stk${i}`}
            data-depth={s.depth}
            style={{ ["--dx" as string]: `${drag[i]?.dx ?? 0}px`, ["--dy" as string]: `${drag[i]?.dy ?? 0}px` }}
          >
            <div>
              <small>{s.label}</small>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {building && (
        <div className={cx("hb-overlay", phase === "fade" && "out")} ref={overlayRef} aria-hidden="true">
          <div className="hb-ruler" />
          {tag && (
            <span className="hb-tag" style={{ left: tag.x, top: tag.y }}>
              /hero · {tag.w} × auto
            </span>
          )}
          {boxes.map((b) => (
            <div
              key={b.id}
              className="hb-box"
              style={{
                left: b.x,
                top: b.y,
                width: b.grow ? b.w : 0,
                height: b.grow ? b.h : 0,
                transitionDuration: `${b.dur}ms`,
                transitionTimingFunction: EASE,
              }}
            >
              <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
              <span className="hb-size" data-w={Math.round(b.w)} data-h={Math.round(b.h)} data-t0={b.t0} data-dur={b.dur}>
                0 × 0
              </span>
            </div>
          ))}
          <div className="hb-line" style={{ top: `${6 + progress * 90}%` }}><span>BUILD LINE</span></div>
          {AGENTS.map((a) => {
            const c = cursors[a.name];
            if (!c) return null;
            return (
              <span
                key={a.name}
                className={cx("hb-cur", c.click && "click")}
                style={{
                  transform: `translate(${c.x}px, ${c.y}px)`,
                  transitionDuration: `${c.dur}ms`,
                  transitionTimingFunction: EASE,
                  opacity: c.show ? 1 : 0,
                  ["--c" as string]: a.color,
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 2l18 8-8 2.5L10.5 21z" /></svg>
                <b>{a.name}</b>
              </span>
            );
          })}
        </div>
      )}

      {barOpen && phase !== "idle" && !prefersReducedMotionSafe() && (
        <div className={cx("hb-bar", !inView && "away", mini && phase === "done" && "mini")} role="status">
          <span className="hb-avatars" aria-hidden="true">
            {AGENTS.slice(0, 5).map((a) => (
              <i key={a.name} style={{ background: a.color }}>{a.name[0]}</i>
            ))}
          </span>
          {mini && phase === "done" ? null : built && !building ? (
            <span>Built by {AGENTS.length} SEO agents in {buildTime ? `${buildTime.toFixed(1)}s` : "seconds"}</span>
          ) : (
            <>
              <span>{AGENTS.length} SEO agents</span>
              <span className="hb-count">{layers} / {total.current} layers</span>
              <span className="hb-track"><i style={{ transform: `scaleX(${progress})` }} /></span>
            </>
          )}
          <button type="button" onClick={phase === "run" ? skip : run}>{phase === "run" ? "Skip" : mini ? "↻ Replay build" : "Replay"}</button>
          <button type="button" className="hb-x" aria-label="Hide build bar" onClick={() => setBarOpen(false)}>×</button>
        </div>
      )}
    </section>
  );
}

function prefersReducedMotionSafe() {
  return typeof window !== "undefined" && prefersReducedMotion();
}

function AuditForm() {
  const [site, setSite] = useState("");
  const [note, setNote] = useState(hero.formNote);
  const input = useRef<HTMLInputElement>(null);

  const [busy, setBusy] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = site.trim().replace(/^https?:\/\//, "");
    if (!/^[^\s]+\.[a-z]{2,}/i.test(clean)) {
      setNote("Enter a website address, like yourwebsite.com.");
      input.current?.focus();
      return;
    }
    setBusy(true);
    const error = await submitLead({ type: "audit", website: clean });
    setBusy(false);
    setNote(error ?? `Thanks. Your audit request for ${clean} is in. We'll email you within 48 hours. Want instant results? Try our free audit tool.`);
  };

  return (
    <>
      <form className="audit" onSubmit={onSubmit} noValidate>
        <label htmlFor="site" className="sr">Your website</label>
        <input
          ref={input}
          id="site"
          name="site"
          type="text"
          inputMode="url"
          placeholder="yourwebsite.com"
          autoComplete="url"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button className="btn red" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Get my free audit"} <span className="arrow" aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="audit-note" role="status">{note}</p>
    </>
  );
}
