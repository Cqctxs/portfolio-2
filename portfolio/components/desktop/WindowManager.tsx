"use client";

import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

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

  const handleClose = useCallback((id: string) => closeWindow(id), [closeWindow]);
  const handleFocus = useCallback((id: string) => focusWindow(id), [focusWindow]);
  const handleMinimize = useCallback((id: string) => minimizeWindow(id), [minimizeWindow]);
  const handleMaximize = useCallback((id: string) => maximizeWindow(id), [maximizeWindow]);
  const handleRestore = useCallback((id: string) => restoreWindow(id), [restoreWindow]);
  const handlePositionChange = useCallback((id: string, pos: { x: number; y: number; }) => updateWindowPosition(id, pos), [updateWindowPosition]);
  const handleSizeChange = useCallback((id: string, size: { width: number; height: number; }) => updateWindowSize(id, size), [updateWindowSize]);

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
              onClose={() => handleClose(windowId)}
              onFocus={() => handleFocus(windowId)}
              onMinimize={() => handleMinimize(windowId)}
              onMaximize={() => handleMaximize(windowId)}
              onRestore={() => handleRestore(windowId)}
              onPositionChange={(pos) => handlePositionChange(windowId, pos)}
              onSizeChange={(size) => handleSizeChange(windowId, size)}
            >
              <WindowComponent />
            </DesktopWindow>
          </div>
        );
      })}
    </div>
  );
}
