"use client";

export default function ProjectsWindow() {
  const projects = [
    {
      title: "Patchy",
      award: "Best App Made with Vellum - Hack the 6ix 2025",
      description:
        "AI-powered security scanner that analyzes codebases for vulnerabilities and auto-generates pull requests with fixes.",
      highlights: [
        "Built backend with GitHub API to scan repos and create PRs",
        "Designed AI workflows with Vellum + OpenAI",
        "Optimized analysis from 6+ min to under 1 min",
      ],
      tech: [
        "React",
        "TypeScript",
        "Express.js",
        "GitHub API",
        "Vellum",
        "OpenAI",
      ],
      github: "https://github.com/eatingfood142434/Patchy",
      linkText: "View on GitHub",
      date: "July 2025",
    },
    {
      title: "Cursequence",
      award: "Best Game Overall - Counterspell 2024",
      description:
        "A deck-building card battler where you fight against your past self. Each round, your previous moves become your enemy.",
      highlights: [
        "Designed full combat system with hand management & status effects",
        "Implemented animations and visual effects in Unity",
        "Coordinated team workflow using Unity Cloud",
      ],
      tech: ["Unity", "C#", "Unity Cloud"],
      github: "https://devpost.com/software/cursequence",
      linkText: "View on Devpost",
      date: "Nov 2024",
    },
    {
      title: "Wanderlust",
      award: "Gemini AI Developer Competition",
      description:
        "AI travel planner that generates personalized itineraries based on your preferences, with real hotel recommendations.",
      highlights: [
        "Integrated Gemini AI with structured JSON output",
        "Auth0 authentication + MongoDB storage",
        "Geocoding & Amadeus APIs for real hotel data",
      ],
      tech: [
        "Express.js",
        "React",
        "Gemini AI",
        "MongoDB",
        "Auth0",
        "Amadeus API",
      ],
      github: "https://github.com/Cqctxs/Wanderlust",
      linkText: "View on GitHub",
      date: "August 2024",
    },
    {
      title: "Silyntax",
      award: "Top 10 - Deltahacks X",
      description:
        "Gamified sign language learning app with real-time webcam feedback to help you learn ASL interactively.",
      highlights: [
        "Built gesture recognition with OpenCV + MediaPipe",
        "Real-time ML inference through Flask backend",
        "Gamified learning with accuracy scoring",
      ],
      tech: ["React", "Flask", "OpenCV", "MediaPipe", "TailwindCSS"],
      github: "https://github.com/Cqctxs/Sylintax",
      linkText: "View on GitHub",
      date: "Jan 2024",
    },
    {
      title: "Screentime Showdown",
      award: "Best Financial Hack - Hack the Valley 8",
      description:
        "Social media detox app where you put your money where your mouth is. Bet on staying offline or lose your wager!",
      highlights: [
        "Integrated Paybilt for real payment processing",
        "Meta API for screen time tracking",
        "Cohere AI for personalized accountability messages",
      ],
      tech: ["React", "Express.js", "Prisma", "Paybilt", "Meta API", "Cohere"],
      github: "https://github.com/JasonLovesDoggo/ScreenTimeShowdown",
      linkText: "View on GitHub",
      date: "Oct 2023",
    },
  ];

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
              {project.linkText}
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
