"use client";

export default function ContactWindow() {
  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "yixiang.s.zhao@gmail.com",
      link: "mailto:yixiang.s.zhao@gmail.com",
      color: "#00ffff",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1-647-333-1548",
      link: "tel:+16473331548",
      color: "#00ff00",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/cqctxs",
      link: "https://linkedin.com/in/cqctxs",
      color: "#0080ff",
    },
    {
      icon: "📁",
      label: "GitHub",
      value: "github.com/Cqctxs",
      link: "https://github.com/Cqctxs",
      color: "#ff00ff",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4" style={{ color: "#ffffff" }}>
      <div
        className="mb-4 text-center"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#ffff00",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        📬 Get In Touch
      </div>

      <div
        className="mb-6 text-center"
        style={{
          fontSize: "11px",
          color: "#c0c0c0",
          lineHeight: "1.5",
        }}
      >
        I'm always interested in hearing about new opportunities,
        collaborations, or just chatting about tech, cybersecurity, and AI!
      </div>

      {/* Contact Methods */}
      <div className="space-y-3">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target={method.link.startsWith("http") ? "_blank" : undefined}
            rel={
              method.link.startsWith("http") ? "noopener noreferrer" : undefined
            }
            style={{
              display: "block",
              background: "rgba(0, 0, 0, 0.4)",
              border: "2px solid",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "12px",
              textDecoration: "none",
              color: "#ffffff",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 128, 0.4)";
              e.currentTarget.style.borderColor =
                "#808080 #ffffff #ffffff #808080";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.4)";
              e.currentTarget.style.borderColor =
                "#ffffff #808080 #808080 #ffffff";
            }}
          >
            <div className="flex items-center gap-3">
              <div style={{ fontSize: "24px" }}>{method.icon}</div>
              <div className="flex-1">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "11px",
                    color: method.color,
                  }}
                >
                  {method.label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#c0c0c0",
                    marginTop: "2px",
                  }}
                >
                  {method.value}
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#808080" }}>→</div>
            </div>
          </a>
        ))}
      </div>

      {/* Additional Info */}
      <div
        className="mt-6"
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
            fontSize: "11px",
            color: "#00ffff",
          }}
        >
          📍 Location
        </div>
        <div style={{ fontSize: "11px" }}>Toronto, Ontario, Canada</div>

        <div
          className="mb-2 mt-4 font-bold"
          style={{
            fontSize: "11px",
            color: "#00ffff",
          }}
        >
          ⏰ Availability
        </div>
        <div style={{ fontSize: "11px" }}>
          Open to internships, co-op opportunities, and collaborations
        </div>
      </div>

      {/* Response Time */}
      <div
        className="mt-4 text-center"
        style={{
          fontSize: "10px",
          color: "#00ff00",
          fontStyle: "italic",
        }}
      >
        ⚡ Typical response time: Within 24 hours
      </div>
    </div>
  );
}
