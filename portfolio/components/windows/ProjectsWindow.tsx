"use client";

export default function ProjectsWindow() {
  const projects = [
    {
      title: "Pilot",
      award: "HackMIT 2026 — The Token Company LLM Price-Saving Challenge winner",
      description:
        "A tool that lets apps and coding agents retrieve website data through reusable commands, even when a site has no official API.",
      highlights: [
        "Generated and validated reusable browser drivers with Playwright",
        "Reused saved drivers without new AI model calls and repaired them after site changes",
        "Connected drivers to Codex and Claude Code through Model Context Protocol (MCP)",
        "Measured 50% fewer tokens in an app-building test using existing drivers",
      ],
      tech: ["TypeScript", "JavaScript", "Playwright", "MCP"],
      github: "https://github.com/Cqctxs/Pilot",
      linkText: "View on GitHub",
      date: "Sept 2026",
    },
    {
      title: "GameNet",
      award: "Self-hosted game server networking",
      description:
        "A Rust tunnel that lets friends join self-hosted game servers with ordinary clients through a public relay.",
      highlights: [
        "Forwarded each player over an independent QUIC stream",
        "Secured the host link with verified TLS 1.3 certificates and hybrid key exchange",
        "Added expiring port claims, connection limits, and host-token recovery",
        "Tested failure paths and benchmarked relay response times",
      ],
      tech: ["Rust", "Tokio", "QUIC", "TLS 1.3", "ML-KEM"],
      github: "https://github.com/Cqctxs/gamenet",
      linkText: "View on GitHub",
      date: "Jan–Sept 2026",
    },
    {
      title: "Alias",
      award: "Best Cybersecurity Hack (1Password) - UofTHacks 13",
      description:
        "AI-powered binary analysis tool that transforms executables into readable C code and flags potential security risks before you run them.",
      highlights: [
        "Built binary decompilation pipeline with Ghidra + LLM4Decompile",
        "Two-pass AI refactoring with Gemini 3 Pro and Gemini Flash",
        "Integrated Gemini AI to generate plain-English security verdicts",
        "Deployed via Docker on Modal for scalable inference",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "FastAPI",
        "Ghidra",
        "LLM4Decompile",
        "Gemini AI",
        "Docker",
        "Modal",
      ],
      github: "https://github.com/Leo-Zh9/Static_Binary_Decompiler_Framework",
      linkText: "View on GitHub",
      date: "Jan 2026",
    },
    {
      title: "Benchy",
      award: "AI Performance Optimizer - GenAI Genesis",
      description:
        "Production-ready developer tool that analyzes, benchmarks, and optimizes code with AI, producing a CodeMark performance score.",
      highlights: [
        "Tree-sitter AST parsing + Gemini 2.5 Pro to identify bottlenecks",
        "LangGraph agent orchestration with PydanticAI structured output",
        "Safe, isolated benchmark execution in Modal cloud containers",
        "React Flow call graph with performance heatmap visualization",
      ],
      tech: [
        "Next.js",
        "FastAPI",
        "LangGraph",
        "PydanticAI",
        "Gemini 2.5 Pro",
        "Tree-sitter",
        "Modal",
        "React Flow",
      ],
      github: "https://github.com/Cqctxs/genai-genisis",
      linkText: "View on GitHub",
      date: "2026",
    },
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
