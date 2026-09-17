import { ImageResponse } from "next/og";
import { brand, contact } from "@/content/site";

export const alt =
  "Arizona Sound System. Turn-key sound rental for events in Arizona";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, generated at build time. Nothing here reads a store, so it
 * can be static. The bars and sun are drawn inline rather than loading the
 * PNG, because next/og cannot fetch a relative asset at build.
 */
const BARS = [0.35, 0.5, 1, 1, 1, 0.6, 0.45, 0.75, 1, 1, 0.65, 0.4];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b0a09",
        color: "#f4ede2",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* The mark, bottom right */}
      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 96,
          display: "flex",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 118,
            bottom: 150,
            width: 130,
            height: 130,
            borderRadius: 999,
            background: "linear-gradient(180deg, #e2a233 0%, #e4592c 100%)",
          }}
        />
        {BARS.map((height, index) => (
          <div
            key={index}
            style={{
              width: 22,
              height: Math.round(height * 200),
              background: "#c25a3a",
              border: "4px solid #0b0a09",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {brand.name}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
        <span
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f0c66e",
          }}
        >
          Turn-key sound rental
        </span>
        <span
          style={{
            fontSize: 96,
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: -4,
            marginTop: 18,
            textTransform: "uppercase",
          }}
        >
          Big sound. Anywhere in Arizona.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(244,237,226,0.25)",
          paddingTop: 26,
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(244,237,226,0.8)",
        }}
      >
        <span>Phoenix, Arizona</span>
        <span>{contact.phone}</span>
      </div>
    </div>,
    size,
  );
}
