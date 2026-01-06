"use client";

import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

export default function WindowManager() {
  const {
    openWindows,
    focusedWindow,
    windowStates,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
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
              onClose={() => closeWindow(windowId)}
              onFocus={() => focusWindow(windowId)}
              onMinimize={() => minimizeWindow(windowId)}
              onMaximize={() => maximizeWindow(windowId)}
              onPositionChange={(pos) => updateWindowPosition(windowId, pos)}
              onSizeChange={(size) => updateWindowSize(windowId, size)}
            >
              <WindowComponent />
            </DesktopWindow>
          </div>
        );
      })}
    </div>
  );
}
