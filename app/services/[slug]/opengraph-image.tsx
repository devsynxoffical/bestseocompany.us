import { renderOg, ogSize } from "@/lib/og";
import { getService, servicePages } from "@/lib/pages";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Best SEO Company";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getService((await params).slug);
  return renderOg({ eyebrow: "SEO service", title: p ? p.h1 : "Best SEO Company", color: p?.color });
}

export const dynamic = "force-static";
