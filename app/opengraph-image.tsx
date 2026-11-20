import { renderOg, ogSize } from "@/lib/og";

export const alt = "Rank #1 on Google with Best SEO Company";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({ eyebrow: "US SEO agency", title: "Rank #1 with Best SEO Company.", color: "lime" });
}

export const dynamic = "force-static";
