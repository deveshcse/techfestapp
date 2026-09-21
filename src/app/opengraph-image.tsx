import { ImageResponse } from "next/og";

export const alt = "TechFestApp — Technical Festival Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #faf7f2 0%, #f3ebe3 55%, #efe4d8 100%)",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#c2410c",
              color: "#fff",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#1a2330",
              letterSpacing: "-0.03em",
            }}
          >
            TechFestApp
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#1a2330",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Technical festivals, fully under control.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#5b6573",
              lineHeight: 1.35,
              maxWidth: 820,
            }}
          >
            Registrations, waitlists, and attendance — one campus dashboard.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            fontWeight: 600,
            color: "#c2410c",
          }}
        >
          techfestapp.com
        </div>
      </div>
    ),
    { ...size }
  );
}
