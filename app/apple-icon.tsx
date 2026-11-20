import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="120" height="120" viewBox="0 0 64 64"><path d="M14 46 L27 30 L36 38 L50 18" fill="none" stroke="#A2F27F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
    size,
  );
}

export const dynamic = "force-static";
