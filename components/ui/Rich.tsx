import Link from "next/link";

/** Renders [label](/internal-path) inside plain copy as internal links. Only site-relative paths are linked. */
export function rich(text: string) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    return m ? <Link key={i} href={m[2]}>{m[1]}</Link> : part;
  });
}

/** Same text with link markup removed, for meta tags and JSON-LD. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");
