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
  onRestore: () => void;
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
  onRestore,
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
        border: "2px outset #c0c0c0",
        background: "#c0c0c0",
        boxShadow: "1px 1px 0px #000000",
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
        className="flex items-center justify-between px-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
        style={{
          background: isFocused
            ? "linear-gradient(90deg, #000080 0%, #1084d0 100%)"
            : "linear-gradient(90deg, #808080 0%, #a0a0a0 100%)",
          height: "18px",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-1">
          {icon ? (
            <img
              src={icon}
              alt=""
              style={{ width: "14px", height: "14px" }}
              draggable={false}
            />
          ) : (
            <div
              style={{
                width: "14px",
                height: "14px",
                background: "#ffffff",
                border: "1px solid #808080",
              }}
            />
          )}
          <span
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: "#ffffff",
              fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            }}
          >
            {title}
          </span>
        </div>

        <div className="flex gap-0.5">
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
              width: "16px",
              height: "14px",
              background: "#c0c0c0",
              border: "none",
              boxShadow: minPressed
                ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
                : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <rect x="0" y="6" width="6" height="2" fill="#000" />
            </svg>
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
              if (isMaximized) {
                onRestore();
              } else {
                onMaximize();
              }
            }}
            onMouseLeave={() => setMaxPressed(false)}
            className="flex items-center justify-center"
            style={{
              width: "16px",
              height: "14px",
              background: "#c0c0c0",
              border: "none",
              boxShadow: maxPressed
                ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
                : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
            }}
          >
            {isMaximized ? (
              <svg width="9" height="9" viewBox="0 0 9 9">
                <rect
                  x="2"
                  y="0"
                  width="7"
                  height="7"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1"
                />
                <rect
                  x="0"
                  y="2"
                  width="7"
                  height="7"
                  fill="#c0c0c0"
                  stroke="#000"
                  strokeWidth="1"
                />
              </svg>
            ) : (
              <svg width="9" height="9" viewBox="0 0 9 9">
                <rect
                  x="0"
                  y="0"
                  width="9"
                  height="9"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                />
              </svg>
            )}
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
              width: "16px",
              height: "14px",
              background: "#c0c0c0",
              border: "none",
              boxShadow: closePressed
                ? "inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080"
                : "inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8">
              <line
                x1="0"
                y1="0"
                x2="8"
                y2="8"
                stroke="#000"
                strokeWidth="1.5"
              />
              <line
                x1="8"
                y1="0"
                x2="0"
                y2="8"
                stroke="#000"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Menu Bar */}
      <div
        className="flex items-center px-1"
        style={{
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
          height: "18px",
          flexShrink: 0,
        }}
      >
        {["File", "Edit", "View", "Help"].map((menuItem) => (
          <button
            key={menuItem}
            className="px-2"
            style={{
              fontSize: "11px",
              color: "#000",
              fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
              background: "transparent",
              border: "none",
              height: "16px",
              lineHeight: "16px",
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
          margin: "2px",
          fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
          fontSize: "11px",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </section>
  );
}
