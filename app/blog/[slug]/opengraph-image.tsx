import { renderOg, ogSize } from "@/lib/og";
import { getPost, blogPosts } from "@/lib/pages/blog-index";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Best SEO Company";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return renderOg({ eyebrow: "Blog", title: p ? p.title : "Best SEO Company", color: "lav" });
}
