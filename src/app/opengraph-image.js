import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lucent — Learn anything, taught by anyone. Free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #ede9fe 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.08)",
            display: "flex",
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 56,
              display: "flex",
            }}
          >
            ✨
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Lucent
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          Learn anything. Teach anything.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "#64748b",
            textAlign: "center",
            maxWidth: 760,
            marginTop: 18,
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Interactive courses with auto-graded exercises. Anyone can publish, anyone can learn. Free.
        </div>

        {/* Pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 32,
          }}
        >
          {["Take a course", "Build your own", "Auto-graded exercises", "Free, forever"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "10px 20px",
                  borderRadius: 24,
                  background: "rgba(124, 58, 237, 0.1)",
                  color: "#7c3aed",
                  fontSize: 18,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "#94a3b8",
            display: "flex",
          }}
        >
          lucentapp.io
        </div>
      </div>
    ),
    { ...size }
  );
}
