"use client";

export default function ResumeWindow() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "W98UI",
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
          Computer Engineering Student | Software Developer
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
              <div>
                Bachelor of Applied Science in Computer Engineering
              </div>
              <div style={{ color: "#808080", fontSize: "10px" }}>
                Expected April 2029 | GPA: 3.97/4.00
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  marginTop: "4px",
                  fontSize: "10px",
                }}
              >
                Dean&apos;s Honour List | ECE Top Student Award
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
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
            EXPERIENCE
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
            }}
          >
            <div style={{ padding: "8px" }}>
              <div style={{ fontWeight: "bold" }}>Data Security Developer Intern</div>
              <div>1Password</div>
              <div style={{ color: "#808080", fontSize: "10px" }}>
                May - August 2026 | Toronto, ON
              </div>
              <ul
                style={{
                  margin: "4px 0 0",
                  paddingLeft: "16px",
                  fontSize: "10px",
                }}
              >
                <li>
                  Developed and tested production data security software in Rust
                </li>
                <li>
                  Evaluated performance and compatibility across supported
                  platforms during a security upgrade
                </li>
                <li>Received the Intern Trailblazer Award</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects Section */}
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
            PROJECTS
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
            }}
          >
            <div style={{ padding: "8px", borderBottom: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>Pilot</div>
              <div>Reusable browser drivers for apps and coding agents</div>
            </div>
            <div style={{ padding: "8px", borderBottom: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>GameNet</div>
              <div>Rust relay for self-hosted game servers</div>
            </div>
            <div style={{ padding: "8px" }}>
              <div style={{ fontWeight: "bold" }}>Alias</div>
              <div>Executable analysis with readable code and security summaries</div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
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
            TECHNICAL SKILLS
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>Languages:</span> Rust, C,
              C++, Python, TypeScript, JavaScript, Java
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Systems &amp; Backend:</span>{" "}
              Linux, Docker, Tokio, QUIC, TLS 1.3, Node.js, Express.js, FastAPI
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Web &amp; Data:</span> React,
              Next.js, PostgreSQL, MongoDB, OpenCV, MediaPipe
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>AI &amp; Security:</span> MCP,
              browser driver generation, applied cryptography, Ghidra
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
                CyberTitan 1st Place
              </div>
            </div>
            <div style={{ padding: "8px", borderBottom: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>Hackathon Winner</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                HackMIT 2026, UofTHacks 13
              </div>
            </div>
            <div style={{ padding: "8px", borderRight: "1px solid #c0c0c0" }}>
              <div style={{ fontWeight: "bold" }}>Dean&apos;s Honour List</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                Faculty of Applied Science
              </div>
            </div>
            <div style={{ padding: "8px" }}>
              <div style={{ fontWeight: "bold" }}>Perfect Score</div>
              <div style={{ fontSize: "10px", color: "#808080" }}>
                CCC Junior 2023
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <a
            href="/resume.pdf"
            download="Sean_Zhao_Resume_Public_SWE.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
            Download SWE Resume (PDF)
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
          Last updated: September 2026
        </div>
      </div>
    </div>
  );
}
