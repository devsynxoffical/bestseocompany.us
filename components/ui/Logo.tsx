export function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M2 14 L7 8 L10 11 L16 3" fill="none" stroke="#A2F27F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Best SEO Company home">
      <LogoMark />
      bestseocompany<span className="tld">.us</span>
    </Link>
  );
}
