"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/lib/pages/menu";
import { Logo } from "@/components/ui/Logo";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { cx } from "@/lib/utils";
import { MenuIcon } from "./MenuIcon";

/**
 * Sticky header with mega-menu dropdowns (hover, click or keyboard) on desktop
 * and a slide-in accordion menu on small screens. Hides while scrolling down.
 */
export function Header({ menu }: { menu: MenuItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const closeTimer = useRef<number>(0);

  const close = useCallback(() => setOpen(null), []);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const y = window.scrollY, dy = y - lastY;
      lastY = y;
      el.classList.toggle("scrolled", y > 10);
      if (Math.abs(dy) > 2 && open === null && !drawer) el.classList.toggle("hide", dy > 0 && y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, drawer]);

  // Escape closes; clicking outside closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  const enter = (i: number) => { clearTimeout(closeTimer.current); setOpen(i); };
  const leave = () => { closeTimer.current = window.setTimeout(close, 160); };
  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  return (
    <header className={cx("nav", open !== null && "menu-open")} ref={ref}>
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          <ul className="nav-list">
            {menu.map((item, i) => (
              <li key={item.label} className={cx("nav-item", item.size && item.size !== "lg" && "nav-item-rel")} onMouseEnter={() => item.columns && enter(i)} onMouseLeave={() => item.columns && leave()}>
                {item.columns ? (
                  <button
                    type="button"
                    className={cx("nav-trigger", isActive(item.href) && "active")}
                    aria-expanded={open === i}
                    aria-controls={`mega-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ) : (
                  <Link href={item.href} className={cx("nav-trigger", isActive(item.href) && "active")} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>
                )}
                {item.columns && (
                  <div id={`mega-${i}`} className={cx("mega", `mega-${item.size ?? "lg"}`, open === i && "open")} hidden={open !== i}>
                    <div className="mega-inner">
                      <div className="mega-body">
                        <div className="mega-cols" style={{ ["--cols" as string]: item.columns.length }}>
                          {item.columns.map((col) => (
                            <div key={col.title} className="mega-col" style={{ ["--tc" as string]: col.tone ?? "var(--lav)" }}>
                              <span className="mega-title"><i aria-hidden="true" />{col.title}</span>
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.href}>
                                    <Link href={l.href} className={cx("mega-link", !l.desc && "plain")}>
                                      {l.icon && <span className="mega-ic"><MenuIcon name={l.icon} /></span>}
                                      <span className="mega-txt">
                                        <b>{l.label}</b>
                                        {l.desc && <span>{l.desc}</span>}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {item.feature && (
                          <Link href={item.feature.href} className="mega-feature" style={{ ["--tc" as string]: item.feature.tone }}>
                            <span className="mega-title">{item.feature.eyebrow}</span>
                            <b>{item.feature.title}</b>
                            <span>{item.feature.copy}</span>
                            <span className="mega-cta">{item.feature.cta} <span aria-hidden="true">↗</span></span>
                          </Link>
                        )}
                      </div>
                      {item.footer && (
                        <div className="mega-foot">
                          <span>{item.footer.text}</span>
                          <span className="mega-foot-links">
                            {item.footer.links.map((l) => <Link key={l.href} href={l.href}>{l.label} <span aria-hidden="true">→</span></Link>)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <MagneticLink href="/free-seo-audit" arrow className="nav-cta">Free audit</MagneticLink>
          <button type="button" className={cx("burger", drawer && "x")} aria-expanded={drawer} aria-controls="mobile-menu" aria-label={drawer ? "Close menu" : "Open menu"} onClick={() => setDrawer(!drawer)}>
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={cx("drawer", drawer && "open")} hidden={!drawer}>
        <nav aria-label="Mobile">
          <ul>
            {menu.map((item, i) => (
              <li key={item.label} className="dr-item">
                {item.columns ? (
                  <>
                    <button type="button" className="dr-trigger" aria-expanded={mobileOpen === i} onClick={() => setMobileOpen(mobileOpen === i ? null : i)}>
                      {item.label}<span aria-hidden="true">{mobileOpen === i ? "−" : "+"}</span>
                    </button>
                    <div className={cx("dr-panel", mobileOpen === i && "open")}>
                      <div>
                        {item.columns.map((col) => (
                          <div key={col.title} className="dr-col">
                            <span className="mega-title">{col.title}</span>
                            {col.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
                          </div>
                        ))}
                        {item.footer && item.footer.links.map((l) => <Link key={l.href} href={l.href} className="mega-more">{l.label} →</Link>)}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="dr-trigger">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/free-seo-audit" className="btn red dr-cta">Get my free audit <span className="arrow" aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
