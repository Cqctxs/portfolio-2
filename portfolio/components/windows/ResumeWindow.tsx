"use client";

export default function ResumeWindow() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
        fontSize: "11px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#000080",
          color: "#ffffff",
          padding: "8px 12px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>Sean Zhao</div>
        <div style={{ fontSize: "11px", marginTop: "2px" }}>
          Computer Engineering Student | Cybersecurity Enthusiast | Full-Stack
          Developer
        </div>
      </div>

      <div style={{ padding: "12px" }}>
        {/* Contact Info Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            padding: "8px",
            background: "#c0c0c0",
            border: "1px solid #808080",
            marginBottom: "12px",
            fontSize: "11px",
          }}
        >
          <span>yixiang.s.zhao@gmail.com</span>
          <span>|</span>
          <span>+1-647-333-1548</span>
          <span>|</span>
          <a
            href="https://linkedin.com/in/cqctxs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0000ff", textDecoration: "underline" }}
          >
            LinkedIn
          </a>
          <span>|</span>
          <a
            href="https://github.com/Cqctxs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0000ff", textDecoration: "underline" }}
          >
            GitHub
          </a>
        </div>

        {/* Education Section */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              background: "#000080",
              color: "#ffffff",
              padding: "2px 8px",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            EDUCATION
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
            }}
          >
            {/* University */}
            <div style={{ padding: "8px", borderBottom: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>University of Toronto</div>
              <div>Bachelor of Arts in Computer Engineering</div>
              <div style={{ color: "#808080", fontSize: "10px" }}>
                Sept. 2025 - April 2030
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  marginTop: "4px",
                  fontSize: "10px",
                }}
              >
                Coursework: APS111, Calculus I, Linear Algebra
              </div>
            </div>
            {/* High School */}
            <div style={{ padding: "8px" }}>
              <div style={{ fontWeight: "bold" }}>
                William Lyon Mackenzie C.I.
              </div>
              <div>MaCS Program Graduate - Specialized Math &amp; CS</div>
              <div style={{ color: "#808080", fontSize: "10px" }}>
                Sept. 2021 - June 2025
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              background: "#000080",
              color: "#ffffff",
              padding: "2px 8px",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            HIGHLIGHTS
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div
              style={{
                padding: "8px",
                borderRight: "1px solid #c0c0c0",
                borderBottom: "1px solid #c0c0c0",
              }}
            >
              <div style={{ fontWeight: "bold" }}>National Champion</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                1st Place
              </div>
            </div>
            <div style={{ padding: "8px", borderBottom: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>Hackathon Winner</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                Competition Winner
              </div>
            </div>
            <div style={{ padding: "8px", borderRight: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>Speed Boost</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                10x Performance
              </div>
            </div>
            <div style={{ padding: "8px" }}>
              <div style={{ fontWeight: "bold" }}>AI Integration</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                ML/AI Experience
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <a
            href="/resume.pdf"
            download
            style={{
              display: "inline-block",
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "6px 20px",
              fontSize: "11px",
              color: "#000000",
              textDecoration: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.borderColor =
                "#808080 #ffffff #ffffff #808080";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderColor =
                "#ffffff #808080 #808080 #ffffff";
            }}
          >
            Download Full Resume (PDF)
          </a>
        </div>

        {/* Last Updated */}
        <div
          style={{
            marginTop: "12px",
            textAlign: "center",
            fontSize: "10px",
            color: "#808080",
          }}
        >
          Last updated: November 2025
        </div>
      </div>
    </div>
  );
}
