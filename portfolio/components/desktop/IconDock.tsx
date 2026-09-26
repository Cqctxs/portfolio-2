"use client";

import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopIcon from "./DesktopIcon";

const miscAppIds = new Set(["terminal", "notepad", "paint"]);
const mainApps = desktopIcons.filter((icon) => !miscAppIds.has(icon.id));
const miscApps = desktopIcons.filter((icon) => miscAppIds.has(icon.id));

export default function IconDock() {
  const { openWindow } = useDesktopState();

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
