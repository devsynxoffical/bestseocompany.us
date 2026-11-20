"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/** Phone-only bottom bar with the main conversion action. Hides near forms and the footer. */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      const nearForm = Array.from(document.querySelectorAll("form")).some((f) => { const r = f.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; });
      const buildBar = document.querySelector(".hb-bar:not(.away)");
      const footer = document.querySelector("footer");
      const footerVisible = !!footer && footer.getBoundingClientRect().top < window.innerHeight;
      setShow(y > 600 && !footerVisible && !nearForm && !buildBar);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  if (pathname === "/free-seo-audit" || pathname === "/contact") return null;
  return (
    <div className={`scta${show ? " on" : ""}`} aria-hidden={!show}>
      <span>Free 40-point SEO audit</span>
      <Link href="/free-seo-audit" className="btn red" tabIndex={show ? 0 : -1} onClick={() => track("sticky_cta_click")}>Get it free ↗</Link>
    </div>
  );
}
