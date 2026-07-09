import { ImageResponse } from "next/og";
import { profile, impactMetrics } from "@/content/site";

export const alt = `${profile.name} — Salesforce DevOps & Cloud Platform Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(145deg, #0f172a, #1e293b)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#f8fbff",
              color: "#0f172a",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", color: "#94a3b8", fontSize: 24, fontWeight: 600 }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              color: "#60a5fa",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              color: "#f8fafc",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 980,
              textTransform: "uppercase",
            }}
          >
            Salesforce &amp; Cloud DevOps, delivered like production.
          </div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {impactMetrics.slice(0, 3).map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", color: "#f8fafc", fontSize: 34, fontWeight: 700 }}>
                {metric.value}
              </div>
              <div style={{ display: "flex", color: "#94a3b8", fontSize: 16, maxWidth: 220 }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
