"use client";

import { useCallback } from "react";

type DesktopIconProps = {
  label: string;
  iconSrc: string;
  onActivate: () => void;
};

export default function DesktopIcon({ label, onActivate }: DesktopIconProps) {
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
      onDoubleClick={onActivate}
      onKeyDown={handleKeyDown}
      className="flex w-full flex-col items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-3 text-xs uppercase tracking-[0.14em] transition hover:border-white/40 focus:border-white focus:outline-none"
    >
      <div className="flex aspect-square w-14 items-center justify-center rounded bg-white/10">
        <span className="text-[10px]">ICON</span>
      </div>
      <span>{label}</span>
    </button>
  );
}
