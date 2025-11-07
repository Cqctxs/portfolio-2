"use client";

import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

export default function WindowManager() {
  const { openWindows, focusedWindow, closeWindow, focusWindow } =
    useDesktopState();

  return (
    <div className="flex flex-1 flex-wrap gap-6 px-8 py-10">
      {openWindows.map((windowId) => {
        const windowConfig = desktopWindowRecord[windowId];
        if (!windowConfig) {
          return null;
        }
        const WindowComponent = windowConfig.component;
        return (
          <DesktopWindow
            key={windowId}
            id={windowId}
            title={windowConfig.title}
            isFocused={focusedWindow === windowId}
            onClose={() => closeWindow(windowId)}
            onFocus={() => focusWindow(windowId)}
          >
            <WindowComponent />
          </DesktopWindow>
        );
      })}
    </div>
  );
}
