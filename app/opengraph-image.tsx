import { ImageResponse } from "next/og";

export const alt = "Asmi Shaikh, Multidisciplinary Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card. Case studies use their own cover poster. */
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4f0e8", padding: 72, color: "#1a1916", fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#6e6a61", fontFamily: "sans-serif" }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: "#e3a23b" }} />
          Multidisciplinary Designer · Mumbai
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 1, letterSpacing: -4 }}>Asmi Shaikh</div>
          <div style={{ marginTop: 28, fontSize: 46, lineHeight: 1.2, color: "#1f4d3a", maxWidth: 940 }}>
            I connect far-flung ideas into experiences that feel simple
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#4a4740", fontFamily: "sans-serif" }}>Research · Products · Services · Screens</div>
      </div>
    ),
    size,
  );
}
