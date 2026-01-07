"use client";

import { useEffect, useState, useRef } from "react";
import { useDesktopState } from "@/stores/desktopState";
import { desktopWindowRecord } from "@/config/desktop";

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

  const { openWindows, focusedWindow, windowStates, restoreWindow } =
    useDesktopState();

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
            bottom: "40px",
            left: "0",
            width: "200px",
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #000000 #000000 #ffffff",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            zIndex: 1000,
            fontFamily: "'W98UI', Tahoma, sans-serif",
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
            <img src="/icons/win98/windows.png" alt="" width="32" height="32" />
            <span style={{ fontSize: "18px" }}>Cactus OS</span>
          </div>

          {/* Menu Items */}
          <div style={{ padding: "2px" }}>
            {[
              { icon: "■", label: "Programs", hasArrow: true },
              { icon: "□", label: "Documents", hasArrow: true },
              { icon: "⚙", label: "Settings", hasArrow: true },
              { icon: "?", label: "Find", hasArrow: true },
              { icon: "i", label: "Help" },
              { icon: ">", label: "Run..." },
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
              { icon: "○", label: "Log Off..." },
              { icon: "●", label: "Shut Down..." },
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
        className="absolute bottom-0 left-0 right-0 flex items-center px-1 py-1 gap-1"
        style={{
          height: "40px",
          background: "#c0c0c0",
          boxShadow: "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
          borderTop: "2px solid #ffffff",
          zIndex: 999,
          fontFamily: "'W98UI', Tahoma, sans-serif",
        }}
      >
        {/* Start Button */}
        <button
          ref={startButtonRef}
          onMouseDown={() => setStartPressed(true)}
          onMouseUp={() => {
            setStartPressed(false);
            handleStartClick();
          }}
          onMouseLeave={() => setStartPressed(false)}
          className="flex items-center gap-2 px-3 py-1 font-bold shrink-0"
          style={{
            background: startPressed ? "#c0c0c0" : "#c0c0c0",
            boxShadow: startPressed
              ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
              : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px rgba(0,0,0,0.2)",
            border: "1px solid #000000",
            fontSize: "13px",
            color: "#000000",
            transform: startPressed ? "translate(1px, 1px)" : "none",
            height: "30px",
            cursor: "pointer",
            fontFamily: "'W98UI', Tahoma, sans-serif",
          }}
        >
          <img
            src="/icons/win98/windows.png"
            alt="Start"
            width="24"
            height="24"
            style={{ flexShrink: 0 }}
          />
          <span>Start</span>
        </button>

        {/* Separator */}
        <div
          style={{
            width: "2px",
            height: "30px",
            borderLeft: "1px solid #808080",
            borderRight: "1px solid #ffffff",
            marginLeft: "2px",
            marginRight: "2px",
          }}
        />

        {/* Open Windows */}
        <div className="flex flex-1 gap-1 overflow-hidden">
          {openWindows.map((windowId) => {
            const windowConfig = desktopWindowRecord[windowId];
            const windowState = windowStates[windowId];
            if (!windowConfig) return null;

            const isActive =
              focusedWindow === windowId && !windowState?.isMinimized;

            return (
              <button
                key={windowId}
                onClick={() => restoreWindow(windowId)}
                className="flex items-center gap-1 px-2 py-1 min-w-0"
                style={{
                  maxWidth: "150px",
                  height: "30px",
                  background: "#c0c0c0",
                  boxShadow: isActive
                    ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
                    : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
                  border: "1px solid #000000",
                  fontSize: "11px",
                  color: "#000000",
                  cursor: "pointer",
                  overflow: "hidden",
                  fontFamily: "'W98UI', Tahoma, sans-serif",
                }}
              >
                <img
                  src={windowConfig.iconSrc}
                  alt=""
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                  draggable={false}
                />
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  {windowConfig.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* System Tray */}
        <div
          className="flex items-center gap-2 px-3 py-1 shrink-0"
          style={{
            background: "#c0c0c0",
            boxShadow: "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080",
            border: "1px solid #808080",
            fontSize: "11px",
            color: "#000000",
            fontFamily: "'W98UI', Tahoma, sans-serif",
            height: "30px",
          }}
          suppressHydrationWarning
        >
          {formatTime(now)}
        </div>
      </footer>
    </>
  );
}
