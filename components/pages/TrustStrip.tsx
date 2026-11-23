import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS: { icon: string; title: string; body: string; link?: { href: string; label: string } }[] = [
  { icon: "M5 12l4 4 10-10", title: "Month to month", body: "After a 90-day start, cancel any time with 30 days' notice.", link: { href: "/pricing", label: "See plans and pricing" } },
  { icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z", title: "White-hat only", body: "No paid links or tricks that risk a Google penalty." },
  { icon: "M4 19V9m6 10V5m6 14v-7m4 7H2", title: "Plain-English reports", body: "One page a month on rankings, leads and next steps." },
  { icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0", title: "Senior strategists", body: "Your account is run by experienced people, not interns.", link: { href: "/about", label: "Meet the team" } },
];

/** Four reasons-to-trust cards with icons. */
export function TrustStrip() {
  return (
    <div className="trust">
      {ITEMS.map((t, i) => (
        <Reveal key={t.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="trust-card">
          <span className="trust-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d={t.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <b>{t.title}</b>
          <span>{t.body}</span>
          {t.link && <Link href={t.link.href} className="trust-link">{t.link.label} <span aria-hidden="true">→</span></Link>}
        </Reveal>
      ))}
    </div>
  );
}
