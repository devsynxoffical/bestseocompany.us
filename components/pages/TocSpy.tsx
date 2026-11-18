"use client";

import { useEffect, useState } from "react";

/** Table of contents that highlights the section currently in view. */
export function TocSpy({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="toc" aria-label="On this page">
      <span className="label">On this page</span>
      <ol>
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} className={active === i.id ? "on" : undefined}>{i.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
