import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
const tones: Record<string, string> = { lav: "#A99BFB", pink: "#F9A8EC", taupe: "#D6CEC8", lime: "#A2F27F" };

/** Shared 1200×630 social image: eyebrow chip, big title, brand footer. */
export function renderOg({ eyebrow, title, color = "lime" }: { eyebrow: string; title: string; color?: string }) {
  const tone = tones[color] ?? color;
  const size = title.length > 70 ? 64 : title.length > 44 ? 76 : 92;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", padding: 70, fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -160, top: -160, width: 560, height: 560, borderRadius: 999, background: tone, opacity: 0.55, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: tone, border: "3px solid #111", fontSize: 26, color: "#111", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, color: "#111", maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 800, color: "#111" }}>
          <div style={{ width: 58, height: 58, borderRadius: 16, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#A2F27F", fontSize: 32 }}>↗</div>
          bestseocompany.us
        </div>
      </div>
    ),
    ogSize,
  );
}
