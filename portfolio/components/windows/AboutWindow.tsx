"use client";

export default function AboutWindow() {
  return (
    <div className="h-full overflow-y-auto p-4" style={{ color: "#ffffff" }}>
      {/* Profile Section */}
      <div className="mb-6 text-center">
        <div
          className="mx-auto mb-4 flex h-32 w-32 items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00ffff 0%, #0080ff 100%)",
            border: "4px solid",
            borderColor: "#ffffff #808080 #808080 #ffffff",
            fontSize: "64px",
            boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
          }}
        >
          👨‍💻
        </div>
        <h1
          className="font-bold"
          style={{
            fontSize: "20px",
            color: "#00ffff",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          Sean Zhao
        </h1>
        <div
          className="mt-2"
          style={{
            fontSize: "12px",
            color: "#ffff00",
            fontWeight: "bold",
          }}
        >
          Computer Engineering Student
        </div>
        <div style={{ fontSize: "11px", color: "#c0c0c0", marginTop: "4px" }}>
          Cybersecurity Champion | AI Developer | Full-Stack Engineer
        </div>
      </div>

      {/* Bio Section */}
      <div
        className="mb-4"
        style={{
          background: "rgba(192, 192, 192, 0.1)",
          border: "2px solid",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          padding: "12px",
        }}
      >
        <div
          className="mb-2 font-bold"
          style={{
            fontSize: "12px",
            color: "#ff00ff",
          }}
        >
          📝 About Me
        </div>
        <p
          style={{
            fontSize: "11px",
            lineHeight: "1.6",
          }}
        >
          Hey! I'm Sean, a Computer Engineering student at the University of
          Toronto with a passion for cybersecurity and AI development. I'm a
          CyberTitan National Champion and love building innovative solutions
          that combine security with cutting-edge technology.
        </p>
        <p
          className="mt-2"
          style={{
            fontSize: "11px",
            lineHeight: "1.6",
          }}
        >
          When I'm not competing in cybersecurity competitions or building AI
          applications, I enjoy optimizing code performance and exploring new
          technologies. I recently optimized an AI analysis from 6+ minutes to
          45 seconds - that's what I call a good day!
        </p>
      </div>

      {/* Highlights */}
      <div className="mb-4">
        <div
          className="mb-2 font-bold"
          style={{
            fontSize: "12px",
            color: "#00ff00",
          }}
        >
          ⭐ Highlights
        </div>
        <div className="space-y-2" style={{ fontSize: "11px" }}>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "8px",
            }}
          >
            🥇 CyberTitan National Champion (2025)
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "8px",
            }}
          >
            🏆 Hack the 6ix Winner - Best App with Vellum (2025)
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "8px",
            }}
          >
            🥈 CyberPatriot National Finals - 2nd Place Cisco (2025)
          </div>
          <div
            style={{
              background: "#000080",
              border: "1px solid #ffffff",
              padding: "8px",
            }}
          >
            💯 CCC Junior Perfect Score (2023)
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <div
        style={{
          background: "rgba(255, 255, 0, 0.1)",
          border: "2px solid #ffff00",
          padding: "12px",
        }}
      >
        <div
          className="mb-2 font-bold"
          style={{
            fontSize: "12px",
            color: "#ffff00",
          }}
        >
          🎯 Currently
        </div>
        <ul className="space-y-1" style={{ fontSize: "11px" }}>
          <li style={{ paddingLeft: "12px" }}>
            📚 Studying Computer Engineering at UofT
          </li>
          <li style={{ paddingLeft: "12px" }}>
            🔐 Exploring advanced cybersecurity techniques
          </li>
          <li style={{ paddingLeft: "12px" }}>
            🤖 Building AI-powered applications
          </li>
          <li style={{ paddingLeft: "12px" }}>
            💻 Contributing to open source projects
          </li>
        </ul>
      </div>

      {/* Fun Fact */}
      <div
        className="mt-4 text-center"
        style={{
          fontSize: "10px",
          color: "#00ffff",
          fontStyle: "italic",
        }}
      >
        💡 Fun Fact: I optimized AI processing by 93% - from 6 minutes to 45
        seconds!
      </div>
    </div>
  );
}
