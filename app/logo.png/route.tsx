import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/** 512×512 PNG logo, referenced by Organization schema and the web manifest. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111", borderRadius: 112, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="340" height="340" viewBox="0 0 64 64"><path d="M14 46 L27 30 L36 38 L50 18" fill="none" stroke="#A2F27F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
