"use client";

import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopIcon from "./DesktopIcon";
import { useMemo } from "react";

export default function IconDock() {
  const { openWindow } = useDesktopState();

  const { mainApps, miscApps } = useMemo(() => {
    const main = desktopIcons.filter(
      (icon) => !["terminal", "notepad", "paint"].includes(icon.id)
    );
    const misc = desktopIcons.filter((icon) =>
      ["terminal", "notepad", "paint"].includes(icon.id)
    );
    return { mainApps: main, miscApps: misc };
  }, []);

  return (
    <>
      {/* Left side - Main portfolio apps */}
      <nav className="absolute left-0 top-0 z-0 flex w-28 flex-col items-center gap-4 px-2 py-6">
        {mainApps.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            iconSrc={icon.iconSrc}
            onActivate={() => openWindow(icon.id)}
          />
        ))}
      </nav>

      {/* Right side - Miscellaneous apps */}
      <nav className="absolute right-0 top-0 z-0 flex w-28 flex-col items-center gap-4 px-2 py-6">
        {miscApps.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            iconSrc={icon.iconSrc}
            onActivate={() => openWindow(icon.id)}
          />
        ))}
      </nav>
    </>
  );
}
