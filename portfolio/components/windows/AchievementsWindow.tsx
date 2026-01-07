"use client";

export default function AchievementsWindow() {
  const achievements = [
    {
      title: "CyberTitan National Champions",
      subtitle: "1st Place Overall",
      description: "Canada's national youth cybersecurity competition",
      date: "May 2025",
    },
    {
      title: "CyberPatriot National Finals 2025",
      subtitle: "Cisco 2nd Place, 6th Overall",
      description: "National cybersecurity defense competition",
      date: "March 2025",
    },
    {
      title: "Hack the 6ix 2025",
      subtitle: "Best App Made with Vellum",
      description: '"Patchy" - AI cybersecurity platform',
      date: "July 2025",
    },
    {
      title: "CCC Senior 2025",
      subtitle: "Distinction",
      description: "Canadian Computing Competition",
      date: "2025",
    },
    {
      title: "CCC Senior 2024",
      subtitle: "Distinction",
      description: "Canadian Computing Competition",
      date: "2024",
    },
    {
      title: "CCC Junior 2023",
      subtitle: "Perfect Score",
      description: "Canadian Computing Competition",
      date: "2023",
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
      <div
        style={{
          background: "#000080",
          color: "#ffffff",
          padding: "4px 8px",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        Awards & Achievements
      </div>

      {/* Achievement List */}
      <div
        style={{
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          background: "#ffffff",
        }}
      >
        {achievements.map((achievement, index) => (
          <div
            key={index}
            style={{
              padding: "6px 8px",
              borderBottom:
                index < achievements.length - 1 ? "1px solid #c0c0c0" : "none",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                background: "#ffff00",
                border: "1px solid #808080",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              *
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{achievement.title}</div>
              <div style={{ color: "#000080" }}>{achievement.subtitle}</div>
              <div style={{ color: "#808080", fontSize: "10px" }}>
                {achievement.description} - {achievement.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "8px",
          padding: "4px",
          background: "#c0c0c0",
          border: "1px solid #808080",
          textAlign: "center",
          fontSize: "10px",
        }}
      >
        Specializing in Cybersecurity & AI Development
      </div>
    </div>
  );
}
