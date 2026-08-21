import { ImageResponse } from "next/og";

// タイポグラフィのみのシンプルなfavicon。画像生成AIは使用していない。
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1013",
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          borderRadius: 14,
        }}
      >
        S
      </div>
    ),
    size,
  );
}
