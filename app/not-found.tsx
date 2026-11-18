import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf">
      <div className="wrap">
        <span className="label">Error 404</span>
        <h1>This page isn&apos;t ranking. Or anywhere.</h1>
        <p>The link may be old or mistyped. Try one of these instead.</p>
        <div className="nf-links">
          <Link href="/" className="btn">Home</Link>
          <Link href="/services" className="btn ghost">Services</Link>
          <Link href="/industries" className="btn ghost">Industries</Link>
          <Link href="/tools/seo-audit-tool" className="btn ghost">Free audit tool</Link>
          <Link href="/site-map" className="btn ghost">Sitemap</Link>
        </div>
      </div>
    </main>
  );
}
