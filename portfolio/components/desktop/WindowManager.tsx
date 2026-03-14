"use client";

import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";
import { useCallback } from "react";

export default function WindowManager() {
  const {
    openWindows,
    focusedWindow,
    windowStates,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopState();

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      {openWindows.map((windowId) => {
        const windowConfig = desktopWindowRecord[windowId];
        const windowState = windowStates[windowId];

        if (!windowConfig || !windowState) {
          return null;
        }

        const WindowComponent = windowConfig.component;

        return (
          <div key={windowId} style={{ pointerEvents: "auto" }}>
            <DesktopWindow
              id={windowId}
              title={windowConfig.title}
              icon={windowConfig.iconSrc}
              isFocused={focusedWindow === windowId}
              position={windowState.position}
              size={windowState.size}
              zIndex={windowState.zIndex}
              isMinimized={windowState.isMinimized}
              isMaximized={windowState.isMaximized}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onRestore={restoreWindow}
              onPositionChange={updateWindowPosition}
              onSizeChange={updateWindowSize}
            >
              <WindowComponent />
            </DesktopWindow>
          </div>
        );
      })}
    </div>
  );
}
