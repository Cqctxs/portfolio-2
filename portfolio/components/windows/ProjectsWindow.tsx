"use client";

export default function ProjectsWindow() {
  const projects = [
    {
      title: "Patchy",
      award: "Winner - Best App Made with Vellum (Hack the 6ix 2025)",
      description:
        "AI cybersecurity platform identifying codebase vulnerabilities and suggesting secure code fixes",
      highlights: [
        "Developed complete backend with GitHub API integration",
        "Optimized AI analysis: 6+ minutes to 45 seconds",
        "Automated pull request creation with security patches",
      ],
      tech: [
        "React",
        "TypeScript",
        "Express.js",
        "GitHub API",
        "Vellum",
        "OpenAI API",
      ],
      github: "https://github.com/Cqctxs",
      date: "July 2025",
    },
    {
      title: "Wanderlust",
      award: "Gemini AI Developer Competition Entry",
      description:
        "AI-powered travel planning platform generating customized itineraries with activities and locations",
      highlights: [
        "Built backend APIs with Gemini AI integration",
        "Implemented Auth0 authentication with MongoDB",
        "Integrated Geocoding and Amadeus APIs for location data",
      ],
      tech: [
        "Express.js",
        "React.js",
        "Gemini AI",
        "MongoDB",
        "Auth0",
        "Amadeus API",
      ],
      github: "https://github.com/Cqctxs",
      date: "August 2024",
    },
  ];

  return (
    <div
      className="h-full overflow-y-auto p-2"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: "11px",
      }}
    >
      {projects.map((project, index) => (
        <fieldset
          key={index}
          style={{
            border: "1px solid #808080",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <legend style={{ padding: "0 4px", fontWeight: "bold" }}>
            {project.title}
          </legend>

          <div
            style={{
              background: "#ffffcc",
              border: "1px solid #808080",
              padding: "4px",
              marginBottom: "8px",
              fontSize: "10px",
            }}
          >
            {project.award}
          </div>

          <p style={{ marginBottom: "8px", lineHeight: "1.4" }}>
            {project.description}
          </p>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              Key Achievements:
            </div>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              Technologies:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    background: "#c0c0c0",
                    border: "1px solid",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    padding: "1px 4px",
                    fontSize: "10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#c0c0c0",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                padding: "2px 8px",
                color: "#000000",
                textDecoration: "none",
                fontSize: "11px",
              }}
            >
              View on GitHub
            </a>
            <span style={{ color: "#808080", fontSize: "10px" }}>
              {project.date}
            </span>
          </div>
        </fieldset>
      ))}

      <div style={{ textAlign: "center", color: "#808080", marginTop: "8px" }}>
        More projects available on{" "}
        <a
          href="https://github.com/Cqctxs"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0000ff" }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
