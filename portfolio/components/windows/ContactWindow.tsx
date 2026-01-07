"use client";

export default function ContactWindow() {
  const contactMethods = [
    {
      label: "Email",
      value: "yixiang.s.zhao@gmail.com",
      link: "mailto:yixiang.s.zhao@gmail.com",
    },
    {
      label: "Phone",
      value: "+1-647-333-1548",
      link: "tel:+16473331548",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/cqctxs",
      link: "https://linkedin.com/in/cqctxs",
    },
    {
      label: "GitHub",
      value: "github.com/Cqctxs",
      link: "https://github.com/Cqctxs",
    },
  ];

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "Tahoma, 'MS Sans Serif', sans-serif",
        fontSize: "11px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#000080",
          color: "#ffffff",
          padding: "4px 8px",
          fontWeight: "bold",
          fontSize: "11px",
        }}
      >
        Contact Information
      </div>

      <div style={{ padding: "12px" }}>
        {/* Introduction */}
        <div
          style={{
            background: "#ffffcc",
            border: "1px solid #000000",
            padding: "8px",
            marginBottom: "12px",
            fontSize: "11px",
          }}
        >
          I&apos;m always interested in hearing about new opportunities,
          collaborations, or just chatting about tech, cybersecurity, and AI!
        </div>

        {/* Contact Methods List */}
        <div
          style={{
            border: "2px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            background: "#ffffff",
          }}
        >
          {/* List Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              background: "#c0c0c0",
              borderBottom: "1px solid #808080",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            <div
              style={{ padding: "2px 8px", borderRight: "1px solid #808080" }}
            >
              Type
            </div>
            <div style={{ padding: "2px 8px" }}>Value</div>
          </div>

          {/* List Items */}
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith("http") ? "_blank" : undefined}
              rel={
                method.link.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                textDecoration: "none",
                color: "#000000",
                borderBottom:
                  index < contactMethods.length - 1
                    ? "1px solid #c0c0c0"
                    : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000080";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
            >
              <div
                style={{ padding: "4px 8px", borderRight: "1px solid #c0c0c0" }}
              >
                {method.label}
              </div>
              <div
                style={{
                  padding: "4px 8px",
                  color: "#0000ff",
                  textDecoration: "underline",
                }}
              >
                {method.value}
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info Section */}
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              background: "#000080",
              color: "#ffffff",
              padding: "2px 8px",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            Additional Information
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              borderTop: "none",
              padding: "8px",
              background: "#ffffff",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontWeight: "bold" }}>Location:</span> Toronto,
              Ontario, Canada
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Availability:</span> Open to
              internships, co-op opportunities, and collaborations
            </div>
          </div>
        </div>

        {/* Response Time Note */}
        <div
          style={{
            marginTop: "12px",
            padding: "4px 8px",
            background: "#c0c0c0",
            border: "1px solid #808080",
            fontSize: "11px",
            textAlign: "center",
          }}
        >
          Typical response time: Within 24 hours
        </div>
      </div>
    </div>
  );
}
