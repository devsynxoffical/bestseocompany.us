import { ImageResponse } from "next/og";

export const alt = "Rank #1 on Google with Best SEO Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share image generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800, color: "#111" }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#A2F27F", fontSize: 34 }}>↗</div>
          bestseocompany.us
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, letterSpacing: -5, lineHeight: 0.95, color: "#111" }}>
          <div style={{ display: "flex" }}>Rank #1 with</div>
          <div style={{ display: "flex" }}>
            <span style={{ background: "#A2F27F", borderRadius: 18, padding: "0 16px" }}>Best SEO</span>&nbsp;Company.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Technical SEO", "Local SEO", "Content", "Link building"].map((t, i) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, fontSize: 26, background: ["#A99BFB", "#F9A8EC", "#D6CEC8", "#A2F27F"][i], color: "#111" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
