"use client";

export default function SkillsWindow() {
  const skillCategories = [
    {
      category: "Languages",
      icon: "💻",
      skills: [
        { name: "JavaScript/TypeScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "C/C++", level: 75 },
        { name: "HTML/CSS", level: 90 },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: "⚛️",
      skills: [
        { name: "React", level: 90 },
        { name: "Node.js/Express.js", level: 85 },
        { name: "Tailwind CSS", level: 85 },
        { name: "NumPy/Matplotlib", level: 70 },
      ],
    },
    {
      category: "AI & APIs",
      icon: "🤖",
      skills: [
        { name: "OpenAI API", level: 85 },
        { name: "Gemini AI", level: 85 },
        { name: "Vellum", level: 80 },
        { name: "GitHub API", level: 85 },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      skills: [
        { name: "Docker", level: 75 },
        { name: "Oracle Cloud", level: 70 },
        { name: "Google Cloud Platform", level: 75 },
        { name: "Vercel", level: 80 },
        { name: "Nginx", level: 70 },
      ],
    },
    {
      category: "Databases & Auth",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "Auth0", level: 80 },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4" style={{ color: "#000000" }}>
      <div className="space-y-4">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex}>
            {/* Category Header */}
            <div
              className="mb-2 flex items-center gap-2 font-bold"
              style={{
                fontSize: "13px",
                color: "#000080",
              }}
            >
              <span>{category.icon}</span>
              <span>{category.category}</span>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div
                    className="mb-1 flex items-center justify-between"
                    style={{ fontSize: "11px" }}
                  >
                    <span>{skill.name}</span>
                    <span style={{ color: "#c0c0c0" }}>{skill.level}%</span>
                  </div>

                  {/* Windows 98 Style Progress Bar */}
                  <div
                    style={{
                      background: "#ffffff",
                      border: "2px solid",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      height: "16px",
                      boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        background:
                          "repeating-linear-gradient(90deg, #000080 0px, #000080 2px, #0000ff 2px, #0000ff 4px)",
                        boxShadow: "inset 1px 1px 0px rgba(255,255,255,0.3)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Experience Section */}
        <div
          className="mt-6"
          style={{
            borderTop: "2px solid #808080",
            paddingTop: "16px",
          }}
        >
          <div
            className="mb-3 font-bold"
            style={{
              fontSize: "13px",
              color: "#000080",
            }}
          >
            💼 Work Experience
          </div>

          <div
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "12px",
            }}
          >
            <div className="mb-2">
              <div
                className="font-bold"
                style={{ fontSize: "12px", color: "#000000" }}
              >
                Sales Representative & Swim Instructor
              </div>
              <div style={{ fontSize: "11px", color: "#808080" }}>
                Olympian Swimming | July 2023 – November 2024
              </div>
            </div>
            <ul className="space-y-1" style={{ fontSize: "11px" }}>
              <li style={{ paddingLeft: "12px" }}>
                • 50+ customers weekly, 95% satisfaction rate
              </li>
              <li style={{ paddingLeft: "12px" }}>
                • 15+ students weekly, 100% safety record
              </li>
              <li style={{ paddingLeft: "12px" }}>
                • 85% student advancement rate to higher skill levels
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
