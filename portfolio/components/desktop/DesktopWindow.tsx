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
        borderColor: isFocused
          ? "rgba(236, 72, 153, 0.8)"
          : "rgba(168, 85, 247, 0.5)",
        background: "rgba(15, 15, 25, 0.85)",
        boxShadow: isFocused
          ? "0 0 30px rgba(236, 72, 153, 0.4), inset 1px 1px 0px rgba(255,255,255,0.1), inset -1px -1px 0px rgba(0,0,0,0.5)"
          : "0 0 15px rgba(124, 58, 237, 0.3), inset 1px 1px 0px rgba(255,255,255,0.05), inset -1px -1px 0px rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Title Bar */}
      <header
        className="flex items-center justify-between px-2 py-1"
        style={{
          background: isFocused
            ? "linear-gradient(90deg, #ec4899 0%, #d946ef 50%, #a855f7 100%)"
            : "linear-gradient(90deg, #6b7280 0%, #9ca3af 100%)",
          height: "24px",
          borderBottom: "2px solid rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow:
                "inset 1px 1px 0px rgba(255,255,255,0.4), inset -1px -1px 0px rgba(0,0,0,0.4)",
            }}
          />
          <span
            className="font-bold"
            style={{
              fontSize: "12px",
              color: "#ffffff",
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
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
          background: "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
          borderBottom: "2px solid rgba(0,0,0,0.3)",
          boxShadow:
            "inset 1px 1px 0px rgba(255,255,255,0.5), inset -1px -1px 0px rgba(0,0,0,0.3)",
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
              e.currentTarget.style.background =
                "linear-gradient(180deg, #a855f7 0%, #9333ea 100%)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow =
                "inset 1px 1px 0px rgba(255,255,255,0.3), inset -1px -1px 0px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {menuItem}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-hidden p-2"
        style={{
          background: "rgba(15, 15, 25, 0.6)",
          border: "2px solid",
          borderColor: "rgba(124, 58, 237, 0.3)",
          boxShadow:
            "inset -1px -1px 0px rgba(255,255,255,0.05), inset 2px 2px 4px rgba(0,0,0,0.5)",
          margin: "2px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
