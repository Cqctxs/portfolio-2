"use client";

export default function AchievementsWindow() {
  const achievements = [
    {
      title: "CyberTitan National Champions",
      subtitle: "1st Place Overall",
      description: "Canada's national youth cybersecurity competition",
      date: "May 2025",
      icon: "🥇",
      color: "#FFD700",
    },
    {
      title: "CyberPatriot National Finals 2025",
      subtitle: "Cisco 2nd Place, 6th Overall",
      description: "National cybersecurity defense competition",
      date: "March 2025",
      icon: "🥈",
      color: "#C0C0C0",
    },
    {
      title: "Hack the 6ix 2025",
      subtitle: "Best App Made with Vellum",
      description: 'Winner for "Patchy" - AI cybersecurity platform',
      date: "July 2025",
      icon: "🏆",
      color: "#00ffff",
    },
    {
      title: "CCC Senior 2025",
      subtitle: "Distinction",
      description: "Canadian Computing Competition",
      date: "2025",
      icon: "⭐",
      color: "#ff00ff",
    },
    {
      title: "CCC Senior 2024",
      subtitle: "Distinction",
      description: "Canadian Computing Competition",
      date: "2024",
      icon: "⭐",
      color: "#ff00ff",
    },
    {
      title: "CCC Junior 2023",
      subtitle: "Perfect Score",
      description: "Canadian Computing Competition",
      date: "2023",
      icon: "💯",
      color: "#00ff00",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4" style={{ color: "#ffffff" }}>
      <div
        className="mb-4 text-center"
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#ffff00",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        🏆 Awards & Achievements 🏆
      </div>

      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "12px",
              boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                style={{
                  fontSize: "32px",
                  lineHeight: "1",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {achievement.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "13px",
                    color: achievement.color,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {achievement.title}
                </div>
                <div
                  className="font-bold"
                  style={{
                    fontSize: "12px",
                    color: "#ffffff",
                    marginTop: "2px",
                  }}
                >
                  {achievement.subtitle}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#c0c0c0",
                    marginTop: "4px",
                  }}
                >
                  {achievement.description}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#808080",
                    marginTop: "4px",
                    fontStyle: "italic",
                  }}
                >
                  {achievement.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div
        className="mt-6 text-center"
        style={{
          fontSize: "11px",
          color: "#00ffff",
          fontStyle: "italic",
        }}
      >
        Specializing in Cybersecurity & AI Development
      </div>
    </div>
  );
}
