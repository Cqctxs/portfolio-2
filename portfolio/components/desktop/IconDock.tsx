"use client";

import { desktopIcons } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopIcon from "./DesktopIcon";

export default function IconDock() {
  const { openWindow } = useDesktopState();

  return (
    <nav className="flex w-32 flex-col items-center gap-6 px-4 py-10">
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
