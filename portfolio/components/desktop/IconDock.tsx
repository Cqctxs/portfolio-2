"use client";

import { useRouter } from "next/navigation";
import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import type { DesktopIconConfig, DesktopWindowId } from "@/types/desktop";
import DesktopIcon from "./DesktopIcon";

const MISC_IDS = new Set<string>(["terminal", "notepad", "paint"]);

export default function IconDock() {
  const { openWindow } = useDesktopState();
  const router = useRouter();

  const mainApps = desktopIcons.filter((icon) => !MISC_IDS.has(icon.id));
  const miscApps = desktopIcons.filter((icon) => MISC_IDS.has(icon.id));

  const activate = (icon: DesktopIconConfig) => {
    if (icon.href) {
      router.push(icon.href);
      return;
    }
    openWindow(icon.id as DesktopWindowId);
  };

  return (
    <>
      {/* Left side - Main portfolio apps */}
      <nav className="absolute left-0 top-0 z-0 flex w-28 flex-col items-center gap-4 px-2 py-6">
        {mainApps.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            iconSrc={icon.iconSrc}
            onActivate={() => activate(icon)}
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
            onActivate={() => activate(icon)}
          />
        ))}
      </nav>
    </>
  );
}
