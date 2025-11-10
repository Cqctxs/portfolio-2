"use client";

export default function ProjectsWindow() {
  const projects = [
    {
      title: "Patchy",
      award: "🏆 Best App Made with Vellum - Hack the 6ix 2025",
      description:
        "AI cybersecurity platform identifying codebase vulnerabilities and suggesting secure code fixes",
      highlights: [
        "Developed complete backend with GitHub API integration",
        "Optimized AI analysis: 6+ minutes → 45 seconds",
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
      award: "🤖 Gemini AI Developer Competition",
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
    <div className="h-full overflow-y-auto p-4" style={{ color: "#000000" }}>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              background: "rgba(192, 192, 192, 0.1)",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "12px",
            }}
          >
            {/* Project Header */}
            <div className="mb-2">
              <h3
                className="font-bold"
                style={{
                  fontSize: "16px",
                  color: "#000080",
                  textShadow: "none",
                }}
              >
                {project.title}
              </h3>
              <div
                className="mt-1"
                style={{
                  fontSize: "11px",
                  color: "#008000",
                  fontWeight: "bold",
                }}
              >
                {project.award}
              </div>
              <div
                className="mt-1"
                style={{
                  fontSize: "10px",
                  color: "#808080",
                }}
              >
                {project.date}
              </div>
            </div>

            {/* Description */}
            <p
              className="mb-3"
              style={{
                fontSize: "12px",
                lineHeight: "1.5",
                color: "#000000",
              }}
            >
              {project.description}
            </p>

            {/* Highlights */}
            <div className="mb-3">
              <div
                className="mb-1 font-bold"
                style={{ fontSize: "11px", color: "#800080" }}
              >
                Key Achievements:
              </div>
              <ul
                className="space-y-1"
                style={{ fontSize: "11px", color: "#000000" }}
              >
                {project.highlights.map((highlight, i) => (
                  <li key={i} style={{ paddingLeft: "12px" }}>
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-3">
              <div
                className="mb-2 font-bold"
                style={{ fontSize: "11px", color: "#008000" }}
              >
                Tech Stack:
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#000080",
                      border: "1px solid #ffffff",
                      padding: "2px 6px",
                      fontSize: "10px",
                      color: "#ffffff",
                      boxShadow:
                        "inset 1px 1px 0px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background:
                    "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
                  border: "1px solid #000000",
                  boxShadow:
                    "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
                  padding: "4px 12px",
                  fontSize: "11px",
                  color: "#000000",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow =
                    "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080";
                }}
              >
                📁 View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* More Projects Note */}
      <div
        className="mt-6 text-center"
        style={{
          fontSize: "11px",
          color: "#808080",
          fontStyle: "italic",
        }}
      >
        More projects available on{" "}
        <a
          href="https://github.com/Cqctxs"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#000080", textDecoration: "underline" }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
