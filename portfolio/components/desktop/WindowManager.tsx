"use client";

import { memo, useCallback } from "react";
import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

const WindowWrapper = memo(function WindowWrapper({ windowId }: { windowId: string }) {
  const windowConfig = desktopWindowRecord[windowId];
  
  const windowState = useDesktopState((state) => state.windowStates[windowId]);
  const isFocused = useDesktopState((state) => state.focusedWindow === windowId);

  const closeWindow = useDesktopState((state) => state.closeWindow);
  const focusWindow = useDesktopState((state) => state.focusWindow);
  const minimizeWindow = useDesktopState((state) => state.minimizeWindow);
  const maximizeWindow = useDesktopState((state) => state.maximizeWindow);
  const restoreWindow = useDesktopState((state) => state.restoreWindow);
  const updateWindowPosition = useDesktopState((state) => state.updateWindowPosition);
  const updateWindowSize = useDesktopState((state) => state.updateWindowSize);

  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);
  const handleFocus = useCallback(() => focusWindow(windowId), [focusWindow, windowId]);
  const handleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleMaximize = useCallback(() => maximizeWindow(windowId), [maximizeWindow, windowId]);
  const handleRestore = useCallback(() => restoreWindow(windowId), [restoreWindow, windowId]);
  const handlePositionChange = useCallback((pos: any) => updateWindowPosition(windowId, pos), [updateWindowPosition, windowId]);
  const handleSizeChange = useCallback((size: any) => updateWindowSize(windowId, size), [updateWindowSize, windowId]);

  if (!windowConfig || !windowState) {
    return null;
  }

  const WindowComponent = windowConfig.component;

  return (
    <div style={{ pointerEvents: "auto" }}>
      <DesktopWindow
        id={windowId}
        title={windowConfig.title}
        icon={windowConfig.iconSrc}
        isFocused={isFocused}
        position={windowState.position}
        size={windowState.size}
        zIndex={windowState.zIndex}
        isMinimized={windowState.isMinimized}
        isMaximized={windowState.isMaximized}
        onClose={handleClose}
        onFocus={handleFocus}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onRestore={handleRestore}
        onPositionChange={handlePositionChange}
        onSizeChange={handleSizeChange}
      >
        <WindowComponent />
      </DesktopWindow>
    </div>
  );
});

export default function WindowManager() {
  const openWindows = useDesktopState((state) => state.openWindows);

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      {openWindows.map((windowId) => (
        <WindowWrapper key={windowId} windowId={windowId} />
      ))}
    </div>
  );
}

