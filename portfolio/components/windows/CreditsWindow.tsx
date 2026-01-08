"use client";

export default function CreditsWindow() {
  return (
    <div
      style={{
        background: "#c0c0c0",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          padding: "20px",
          fontSize: "11px",
          lineHeight: "1.6",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#000080",
          }}
        >
          Credits
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#000000",
            }}
          >
            Technologies Used
          </h3>
          <ul style={{ marginLeft: "20px", marginBottom: "12px" }}>
            <li>
              <strong>Next.js</strong> - React framework for production
            </li>
            <li>
              <strong>React Three Fiber</strong> - React renderer for Three.js
            </li>
            <li>
              <strong>Three.js</strong> - 3D graphics library
            </li>
            <li>
              <strong>TypeScript</strong>
            </li>
            <li>
              <strong>Tailwind CSS</strong>
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#000000",
            }}
          >
            Design Inspiration
          </h3>
          <ul style={{ marginLeft: "20px", marginBottom: "12px" }}>
            <li>Windows 98 UI/UX design</li>
            <li>Synthwave</li>
            <li>Inspired by: https://www.based.gg/</li>
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <ul style={{ marginLeft: "20px", marginBottom: "12px" }}>
            <li>3D Models created with Blender</li>
          </ul>
        </div>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid #808080",
            fontSize: "10px",
            color: "#808080",
          }}
        >
          <p>
            Built with ❤️ using modern web technologies
            <br />© 2026 - Designed and developed from scratch
          </p>
        </div>
      </div>
    </div>
  );
}
