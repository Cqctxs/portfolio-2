"use client";

import { DesktopStateProvider } from "@/stores/desktopState";
import DesktopBackground from "./DesktopBackground";
import IconDock from "./IconDock";
import SystemBar from "./SystemBar";
import WindowManager from "./WindowManager";

export default function DesktopShell() {
  return (
    <DesktopStateProvider>
      <div className="fixed inset-0 overflow-hidden text-white">
        <DesktopBackground />
        <div className="relative z-10 flex h-full pb-8">
          <IconDock />
          <WindowManager />
        </div>
        <SystemBar />
      </div>
    </DesktopStateProvider>
  );
}
