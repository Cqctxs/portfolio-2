"use client";

export default function AboutWindow() {
  return (
    <div
      className="h-full overflow-y-auto p-2"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "'W98UI', Tahoma, sans-serif",
        fontSize: "11px",
      }}
    >
      {/* Profile Section */}
      <div className="mb-4 flex gap-3">
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="16" r="10" fill="#000080" />
            <ellipse cx="24" cy="40" rx="16" ry="12" fill="#000080" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>Sean Zhao</div>
          <div style={{ color: "#808080", marginTop: "2px" }}>
            Computer Engineering Student
          </div>
          <div style={{ color: "#808080", marginTop: "2px" }}>
            University of Toronto
          </div>
        </div>
      </div>

      {/* About Section */}
      <fieldset
        style={{
          border: "1px solid #808080",
          padding: "8px",
          marginBottom: "8px",
        }}
      >
        <legend style={{ padding: "0 4px", fontWeight: "bold" }}>
          About Me
        </legend>
        <p style={{ lineHeight: "1.5", marginBottom: "8px" }}>
          Hey there! I&apos;m a Computer Engineering student at UofT with a deep
          passion for cybersecurity and building cool stuff with AI.
        </p>
        <p style={{ lineHeight: "1.5" }}>
          When I&apos;m not studying, you&apos;ll find me at hackathons, leading
          cybersecurity workshops, or tinkering with new projects. I love
          turning complex problems into elegant solutions!
        </p>
      </fieldset>

      {/* Highlights */}
      <fieldset
        style={{
          border: "1px solid #808080",
          padding: "8px",
          marginBottom: "8px",
        }}
      >
        <legend style={{ padding: "0 4px", fontWeight: "bold" }}>
          Highlights
        </legend>
        <ul style={{ margin: 0, paddingLeft: "16px" }}>
          <li>CyberTitan National Champion (2025)</li>
          <li>Hack the 6ix Winner - Best App with Vellum (2025)</li>
          <li>CyberPatriot National Finals - 2nd Place Cisco (2025)</li>
          <li>CCC Junior Perfect Score (2023)</li>
        </ul>
      </fieldset>

      {/* Currently */}
      <fieldset
        style={{
          border: "1px solid #808080",
          padding: "8px",
        }}
      >
        <legend style={{ padding: "0 4px", fontWeight: "bold" }}>
          What I&apos;m Up To
        </legend>
        <ul style={{ margin: 0, paddingLeft: "16px" }}>
          <li>First-year Computer Engineering @ UofT</li>
          <li>Learning lower-level systems & hardware</li>
          <li>Always down to hack at a hackathon</li>
          <li>Building projects that solve real problems</li>
        </ul>
      </fieldset>
    </div>
  );
}
