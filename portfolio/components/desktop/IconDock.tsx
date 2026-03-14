"use client";

import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopIcon from "./DesktopIcon";

const MISC_APP_IDS = new Set(["terminal", "notepad", "paint"]);

const { mainApps, miscApps } = desktopIcons.reduce(
  (acc, icon) => {
    if (MISC_APP_IDS.has(icon.id)) {
      acc.miscApps.push(icon);
    } else {
      acc.mainApps.push(icon);
    }
    return acc;
  },
  { mainApps: [] as typeof desktopIcons, miscApps: [] as typeof desktopIcons }
);

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
