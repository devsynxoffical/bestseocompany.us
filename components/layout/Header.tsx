"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { MagneticLink } from "@/components/ui/MagneticLink";

/** Sticky header that hides while scrolling down and returns when scrolling up. */
export function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      el.classList.toggle("scrolled", y > 10);
      if (Math.abs(dy) > 2) el.classList.toggle("hide", dy > 0 && y > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" ref={ref}>
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          {nav.map((item) => {
            const active = !item.href.includes("#") && pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={active ? "active" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <MagneticLink href="/#audit" arrow>
          Free audit
        </MagneticLink>
      </div>
    </header>
  );
}
