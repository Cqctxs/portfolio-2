"use client";

import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopIcon from "./DesktopIcon";

export default function IconDock() {
  const { openWindow } = useDesktopState();

  return (
    <nav className="relative z-0 flex w-28 flex-col items-center gap-4 px-2 py-6">
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          label={icon.label}
          iconSrc={icon.iconSrc}
          onActivate={() => openWindow(icon.id)}
        />
      ))}
    </nav>
  );
}
