"use client";

import { useEffect, useState, useRef } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function SystemBar() {
  const [now, setNow] = useState(new Date());
  const [startPressed, setStartPressed] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        startButtonRef.current &&
        !startButtonRef.current.contains(event.target as Node)
      ) {
        setStartMenuOpen(false);
      }
    };

    if (startMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuOpen]);

  const handleStartClick = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  return (
    <>
      {/* Start Menu */}
      {startMenuOpen && (
        <div
          ref={menuRef}
          className="absolute"
          style={{
            bottom: "32px",
            left: "0",
            width: "200px",
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #000000 #000000 #ffffff",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          {/* Menu Header */}
          <div
            style={{
              background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
              color: "#ffffff",
              padding: "4px 8px",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #808080",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🪟</span>
            <span style={{ fontSize: "18px" }}>Windows 98</span>
          </div>

          {/* Menu Items */}
          <div style={{ padding: "2px" }}>
            {[
              { icon: "📁", label: "Programs", hasArrow: true },
              { icon: "📄", label: "Documents", hasArrow: true },
              { icon: "⚙️", label: "Settings", hasArrow: true },
              { icon: "🔍", label: "Find", hasArrow: true },
              { icon: "❓", label: "Help" },
              { icon: "▶️", label: "Run..." },
            ].map((item, index) => (
              <button
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  fontSize: "11px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#000080";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {item.hasArrow && <span>▶</span>}
              </button>
            ))}

            {/* Separator */}
            <div
              style={{
                height: "2px",
                margin: "2px 0",
                borderTop: "1px solid #808080",
                borderBottom: "1px solid #ffffff",
              }}
            />

            {/* Bottom Items */}
            {[
              { icon: "🔌", label: "Log Off..." },
              { icon: "🔴", label: "Shut Down..." },
            ].map((item, index) => (
              <button
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 8px",
                  fontSize: "11px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#000080";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <footer
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1 py-1"
        style={{
          height: "32px",
          background: "#c0c0c0",
          boxShadow: "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
          borderTop: "2px solid #ffffff",
          zIndex: 999,
        }}
      >
        <button
          ref={startButtonRef}
          onMouseDown={() => setStartPressed(true)}
          onMouseUp={() => {
            setStartPressed(false);
            handleStartClick();
          }}
          onMouseLeave={() => setStartPressed(false)}
          className="flex items-center gap-2 px-3 py-1 font-bold"
          style={{
            background: startPressed ? "#c0c0c0" : "#c0c0c0",
            boxShadow: startPressed
              ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
              : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px rgba(0,0,0,0.2)",
            border: "1px solid #000000",
            fontSize: "13px",
            color: "#000000",
            transform: startPressed ? "translate(1px, 1px)" : "none",
            height: "24px",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>⊞</span>
          <span>Start</span>
        </button>

        <div
          className="flex items-center gap-2 px-3 py-1"
          style={{
            background: "#c0c0c0",
            boxShadow: "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080",
            border: "1px solid #808080",
            fontSize: "11px",
            color: "#000000",
            fontFamily: "monospace",
            height: "24px",
          }}
          suppressHydrationWarning
        >
          🔊 {formatTime(now)}
        </div>
      </footer>
    </>
  );
}
