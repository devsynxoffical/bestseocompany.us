import { renderOg, ogSize } from "@/lib/og";
import { getGuide, guidePages } from "@/lib/pages";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Best SEO Company";

export function generateStaticParams() {
  return guidePages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getGuide((await params).slug);
  return renderOg({ eyebrow: p?.category ?? "Guide", title: p ? p.question : "Best SEO Company", color: "lime" });
}
