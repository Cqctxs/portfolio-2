"use client";

export default function ResumeWindow() {
  return (
    <div className="h-full overflow-y-auto p-4" style={{ color: "#ffffff" }}>
      {/* Header */}
      <div className="mb-4 text-center">
        <h1
          className="font-bold"
          style={{
            fontSize: "18px",
            color: "#00ffff",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          Sean Zhao
        </h1>
        <div style={{ fontSize: "11px", color: "#c0c0c0", marginTop: "4px" }}>
          Computer Engineering Student | Cybersecurity Enthusiast | Full-Stack
          Developer
        </div>
        <div
          className="mt-2 flex flex-wrap justify-center gap-2"
          style={{ fontSize: "10px" }}
        >
          <span>📧 yixiang.s.zhao@gmail.com</span>
          <span>📱 +1-647-333-1548</span>
        </div>
        <div
          className="mt-1 flex flex-wrap justify-center gap-3"
          style={{ fontSize: "10px" }}
        >
          <a
            href="https://linkedin.com/in/cqctxs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00ffff" }}
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/Cqctxs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00ffff" }}
          >
            📁 GitHub
          </a>
        </div>
      </div>

      {/* Education */}
      <div className="mb-4">
        <div
          className="mb-2 font-bold"
          style={{
            fontSize: "13px",
            color: "#ffff00",
            borderBottom: "2px solid #808080",
            paddingBottom: "4px",
          }}
        >
          🎓 EDUCATION
        </div>
        <div
          style={{
            background: "rgba(192, 192, 192, 0.1)",
            border: "1px solid #808080",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <div className="font-bold" style={{ fontSize: "12px" }}>
            University of Toronto
          </div>
          <div style={{ fontSize: "11px", color: "#c0c0c0" }}>
            Bachelor of Arts in Computer Engineering
          </div>
          <div style={{ fontSize: "10px", color: "#808080" }}>
            Sept. 2025 – April 2030
          </div>
          <div
            className="mt-1"
            style={{ fontSize: "10px", fontStyle: "italic" }}
          >
            Coursework: APS111, Calculus I, Linear Algebra
          </div>
        </div>
        <div
          style={{
            background: "rgba(192, 192, 192, 0.1)",
            border: "1px solid #808080",
            padding: "8px",
          }}
        >
          <div className="font-bold" style={{ fontSize: "12px" }}>
            William Lyon Mackenzie C.I.
          </div>
          <div style={{ fontSize: "11px", color: "#c0c0c0" }}>
            MaCS Program Graduate - Specialized Math & CS
          </div>
          <div style={{ fontSize: "10px", color: "#808080" }}>
            Sept. 2021 – June 2025
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-4">
        <div
          className="mb-2 font-bold"
          style={{
            fontSize: "13px",
            color: "#ffff00",
            borderBottom: "2px solid #808080",
            paddingBottom: "4px",
          }}
        >
          📊 QUICK STATS
        </div>
        <div
          className="grid grid-cols-2 gap-2"
          style={{
            fontSize: "11px",
          }}
        >
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "16px" }}>🥇</div>
            <div>National Champion</div>
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "16px" }}>🏆</div>
            <div>Hackathon Winner</div>
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "16px" }}>⚡</div>
            <div>10x Speed Boost</div>
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "16px" }}>🤖</div>
            <div>AI Integration</div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <a
          href="/resume.pdf"
          download
          style={{
            display: "inline-block",
            background: "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
            border: "2px solid",
            borderColor: "#ffffff #000000 #000000 #ffffff",
            boxShadow: "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
            padding: "8px 24px",
            fontSize: "12px",
            color: "#000000",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow =
              "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080";
            e.currentTarget.style.transform = "translate(1px, 1px)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow =
              "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080";
            e.currentTarget.style.transform = "none";
          }}
        >
          📄 Download Full Resume (PDF)
        </a>
      </div>

      <div
        className="mt-4 text-center"
        style={{ fontSize: "10px", color: "#808080", fontStyle: "italic" }}
      >
        Last updated: November 2025
      </div>
    </div>
  );
}
