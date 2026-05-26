import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            fontSize: 13,
            color: "#6366f1",
            letterSpacing: "0.12em",
            lineHeight: 1,
          }}
        >
          MG
        </span>
      </div>
    ),
    { ...size }
  );
}
