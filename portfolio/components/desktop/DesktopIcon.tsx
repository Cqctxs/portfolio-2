"use client";

import { useCallback } from "react";

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
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    },
    [onActivate]
  );

  return (
    <button
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      className="flex w-full flex-col items-center gap-1 rounded p-2 text-xs transition hover:bg-white/20 focus:bg-white/30 focus:outline-none"
      style={{
        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
      }}
    >
      <div className="flex h-12 w-12 items-center justify-center">
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
      <span className="text-center text-[11px] leading-tight">{label}</span>
    </button>
  );
}
