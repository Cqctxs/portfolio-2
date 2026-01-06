"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { WindowPosition, WindowSize } from "@/stores/desktopState";

type DesktopWindowProps = {
  id: string;
  title: string;
  icon?: string;
  isFocused: boolean;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (position: WindowPosition) => void;
  onSizeChange: (size: WindowSize) => void;
  children: React.ReactNode;
};

const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

export default function DesktopWindow({
  title,
  icon,
  isFocused,
  position,
  size,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
  children,
}: DesktopWindowProps) {
  const [closePressed, setClosePressed] = useState(false);
  const [minPressed, setMinPressed] = useState(false);
  const [maxPressed, setMaxPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });
  const windowRef = useRef<HTMLElement>(null);

  // Handle dragging (disabled when maximized)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      if (isMaximized) return;

      e.preventDefault();
      onFocus();
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, onFocus, isMaximized]
  );

  // Handle resize start (disabled when maximized)
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (isMaximized) return;

      e.preventDefault();
      e.stopPropagation();
      onFocus();
      setIsResizing(true);
      setResizeDirection(direction);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
        posX: position.x,
        posY: position.y,
      };
    },
    [size, position, onFocus, isMaximized]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(
          0,
          Math.min(e.clientX - dragOffset.current.x, window.innerWidth - 100)
        );
        const newY = Math.max(
          0,
          Math.min(e.clientY - dragOffset.current.y, window.innerHeight - 100)
        );
        onPositionChange({ x: newX, y: newY });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.posX;
        let newY = resizeStart.current.posY;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(MIN_WIDTH, resizeStart.current.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          const potentialWidth = resizeStart.current.width - deltaX;
          if (potentialWidth >= MIN_WIDTH) {
            newWidth = potentialWidth;
            newX = resizeStart.current.posX + deltaX;
          }
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(MIN_HEIGHT, resizeStart.current.height + deltaY);
        }
        if (resizeDirection.includes("n")) {
          const potentialHeight = resizeStart.current.height - deltaY;
          if (potentialHeight >= MIN_HEIGHT) {
            newHeight = potentialHeight;
            newY = resizeStart.current.posY + deltaY;
          }
        }

        // Constrain to viewport
        const maxWidth = window.innerWidth - newX - 10;
        const maxHeight = window.innerHeight - newY - 50;
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        onSizeChange({ width: newWidth, height: newHeight });
        if (resizeDirection.includes("w") || resizeDirection.includes("n")) {
          onPositionChange({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, isResizing, resizeDirection, onPositionChange, onSizeChange]);

  // Don't render if minimized (must be after all hooks)
  if (isMinimized) {
    return null;
  }

  return (
    <section
      ref={windowRef}
      role="dialog"
      aria-label={title}
      aria-modal="false"
      onMouseDown={onFocus}
      className="absolute flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
        border: "2px solid",
        borderColor: "#ffffff #000000 #000000 #ffffff",
        background: "#c0c0c0",
        boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      }}
    >
      {/* Resize handles */}
      <div
        className="absolute -top-1 left-2 right-2 h-2 cursor-n-resize"
        onMouseDown={(e) => handleResizeStart(e, "n")}
      />
      <div
        className="absolute -bottom-1 left-2 right-2 h-2 cursor-s-resize"
        onMouseDown={(e) => handleResizeStart(e, "s")}
      />
      <div
        className="absolute -left-1 top-2 bottom-2 w-2 cursor-w-resize"
        onMouseDown={(e) => handleResizeStart(e, "w")}
      />
      <div
        className="absolute -right-1 top-2 bottom-2 w-2 cursor-e-resize"
        onMouseDown={(e) => handleResizeStart(e, "e")}
      />
      <div
        className="absolute -top-1 -left-1 h-3 w-3 cursor-nw-resize"
        onMouseDown={(e) => handleResizeStart(e, "nw")}
      />
      <div
        className="absolute -top-1 -right-1 h-3 w-3 cursor-ne-resize"
        onMouseDown={(e) => handleResizeStart(e, "ne")}
      />
      <div
        className="absolute -bottom-1 -left-1 h-3 w-3 cursor-sw-resize"
        onMouseDown={(e) => handleResizeStart(e, "sw")}
      />
      <div
        className="absolute -bottom-1 -right-1 h-3 w-3 cursor-se-resize"
        onMouseDown={(e) => handleResizeStart(e, "se")}
      />

      {/* Title Bar */}
      <header
        className="flex items-center justify-between px-2 py-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
        style={{
          background: isFocused
            ? "linear-gradient(90deg, #000080 0%, #1084d0 100%)"
            : "linear-gradient(90deg, #808080 0%, #808080 100%)",
          height: "24px",
          borderBottom: "1px solid #000000",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2">
          {icon ? (
            <img
              src={icon}
              alt=""
              style={{ width: "16px", height: "16px" }}
              draggable={false}
            />
          ) : (
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
          )}
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
          {/* Minimize button */}
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              setMinPressed(true);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              setMinPressed(false);
              onMinimize();
            }}
            onMouseLeave={() => setMinPressed(false)}
            className="flex items-center justify-center"
            style={{
              width: "18px",
              height: "18px",
              background: minPressed
                ? "linear-gradient(180deg, #a1a1aa 0%, #d4d4d8 100%)"
                : "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow: minPressed
                ? "inset -1px -1px 0px rgba(255,255,255,0.3), inset 1px 1px 0px rgba(0,0,0,0.4)"
                : "inset 1px 1px 0px rgba(255,255,255,0.6), inset -1px -1px 0px rgba(0,0,0,0.3)",
              fontSize: "10px",
              fontWeight: "bold",
              color: "#000",
              transform: minPressed ? "translate(1px, 1px)" : "none",
            }}
          >
            _
          </button>
          {/* Maximize/Restore button */}
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              setMaxPressed(true);
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              setMaxPressed(false);
              onMaximize();
            }}
            onMouseLeave={() => setMaxPressed(false)}
            className="flex items-center justify-center"
            style={{
              width: "18px",
              height: "18px",
              background: maxPressed
                ? "linear-gradient(180deg, #a1a1aa 0%, #d4d4d8 100%)"
                : "linear-gradient(180deg, #d4d4d8 0%, #a1a1aa 100%)",
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow: maxPressed
                ? "inset -1px -1px 0px rgba(255,255,255,0.3), inset 1px 1px 0px rgba(0,0,0,0.4)"
                : "inset 1px 1px 0px rgba(255,255,255,0.6), inset -1px -1px 0px rgba(0,0,0,0.3)",
              fontSize: "9px",
              fontWeight: "bold",
              color: "#000",
              transform: maxPressed ? "translate(1px, 1px)" : "none",
            }}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          {/* Close button */}
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
          flexShrink: 0,
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
        className="flex-1 overflow-auto"
        style={{
          background: "#ffffff",
          color: "#000000",
          border: "2px solid",
          borderColor: "#808080 #ffffff #ffffff #808080",
          boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
          margin: "2px",
          fontFamily: "Courier New, monospace",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </section>
  );
}
