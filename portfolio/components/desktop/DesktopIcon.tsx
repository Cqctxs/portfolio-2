"use client";

import { useCallback, useState } from "react";

type DesktopIconProps = {
  label: string;
  iconSrc: string;
  onActivate: () => void;
};

export default function DesktopIcon({
  label,
  iconSrc,
  onActivate,
}: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    },
    [onActivate]
  );

  const isSelected = isHovered || isFocused;

  return (
    <button
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="flex w-full flex-col items-center gap-1 p-2 text-xs"
      style={{
        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "'W98UI', Tahoma, sans-serif",
      }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center"
        style={{
          border: isSelected ? "1px dotted #ffffff" : "1px solid transparent",
        }}
      >
        <img
          src={iconSrc}
          alt={label}
          className="h-10 w-10 object-contain"
          style={{
            imageRendering: "pixelated",
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))",
          }}
          draggable={false}
        />
      </div>
      <span
        className="text-center text-[11px] leading-tight px-1"
        style={{
          background: isSelected ? "#000080" : "transparent",
          color: "#ffffff",
        }}
      >
        {label}
      </span>
    </button>
  );
}
