"use client";

import { useState } from "react";

type DesktopWindowProps = {
  id: string;
  title: string;
  isFocused: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
};

export default function DesktopWindow({
  title,
  isFocused,
  onClose,
  onFocus,
  children,
}: DesktopWindowProps) {
  const [closePressed, setClosePressed] = useState(false);

  return (
    <section
      role="dialog"
      aria-label={title}
      aria-modal="false"
      onMouseDown={onFocus}
      className="flex w-[400px] flex-col"
      style={{
        border: "2px solid",
        borderColor: "#ffffff #000000 #000000 #ffffff",
        background: "#c0c0c0",
        boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title Bar */}
      <header
        className="flex items-center justify-between px-2 py-1"
        style={{
          background: isFocused
            ? "linear-gradient(90deg, #000080 0%, #1084d0 100%)"
            : "linear-gradient(90deg, #808080 0%, #808080 100%)",
          height: "24px",
          borderBottom: "1px solid #000000",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow:
                "inset 1px 1px 0px rgba(255,255,255,0.4), inset -1px -1px 0px rgba(0,0,0,0.4)",
            }}
          />
          <span
            className="font-bold"
            style={{
              fontSize: "12px",
              color: "#ffffff",
              textShadow: "1px 1px 1px rgba(0,0,0,0.8)",
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            className="flex items-center justify-center"
            style={{
              width: "18px",
              height: "18px",
              background: "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow:
                "inset 1px 1px 0px rgba(255,255,255,0.6), inset -1px -1px 0px rgba(0,0,0,0.3)",
              fontSize: "10px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            _
          </button>
          <button
            className="flex items-center justify-center"
            style={{
              width: "18px",
              height: "18px",
              background: "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow:
                "inset 1px 1px 0px rgba(255,255,255,0.6), inset -1px -1px 0px rgba(0,0,0,0.3)",
              fontSize: "9px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            □
          </button>
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              setClosePressed(true);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              setClosePressed(false);
              onClose();
            }}
            onMouseLeave={() => setClosePressed(false)}
            className="flex items-center justify-center"
            style={{
              width: "18px",
              height: "18px",
              background: closePressed
                ? "linear-gradient(180deg, #a1a1aa 0%, #d4d4d8 100%)"
                : "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow: closePressed
                ? "inset -1px -1px 0px rgba(255,255,255,0.3), inset 1px 1px 0px rgba(0,0,0,0.4)"
                : "inset 1px 1px 0px rgba(255,255,255,0.6), inset -1px -1px 0px rgba(0,0,0,0.3)",
              fontSize: "11px",
              fontWeight: "bold",
              color: "#000",
              transform: closePressed ? "translate(1px, 1px)" : "none",
            }}
          >
            ×
          </button>
        </div>
      </header>

      {/* Menu Bar */}
      <div
        className="flex items-center gap-1 px-2 py-1"
        style={{
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          boxShadow:
            "inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(0,0,0,0.2)",
          height: "22px",
        }}
      >
        {["File", "Edit", "View", "Help"].map((menuItem) => (
          <button
            key={menuItem}
            className="px-2 py-0.5"
            style={{
              fontSize: "11px",
              color: "#000",
              fontFamily: "Arial, sans-serif",
              background: "transparent",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000080";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000";
            }}
          >
            {menuItem}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          background: "#ffffff",
          color: "#000000",
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
          margin: "2px",
          fontFamily: "Courier New, monospace",
        }}
      >
        {children}
      </div>
    </section>
  );
}
