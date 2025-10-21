"use client";

import { DesktopStateProvider } from "@/stores/desktopState";
import DesktopBackground from "./DesktopBackground";
import IconDock from "./IconDock";
import SystemBar from "./SystemBar";
import WindowManager from "./WindowManager";

export default function DesktopShell() {
  return (
    <DesktopStateProvider>
      <div className="relative min-h-screen overflow-hidden text-white">
        <DesktopBackground />
        <div className="relative z-10 flex min-h-screen">
          <IconDock />
          <WindowManager />
        </div>
        <SystemBar />
      </div>
    </DesktopStateProvider>
  );
}
