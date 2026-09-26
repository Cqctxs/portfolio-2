"use client";

import React, { useCallback, memo } from "react";
import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

const WindowWrapper = memo(({ windowId }: { windowId: string }) => {
  const windowConfig = desktopWindowRecord[windowId];

  // Select only state relevant to this window
  const isFocused = useDesktopState((state) => state.focusedWindow === windowId);
  const windowState = useDesktopState((state) => state.windowStates[windowId]);

  const closeWindow = useDesktopState((state) => state.closeWindow);
  const focusWindow = useDesktopState((state) => state.focusWindow);
  const minimizeWindow = useDesktopState((state) => state.minimizeWindow);
  const maximizeWindow = useDesktopState((state) => state.maximizeWindow);
  const restoreWindow = useDesktopState((state) => state.restoreWindow);
  const updateWindowPosition = useDesktopState((state) => state.updateWindowPosition);
  const updateWindowSize = useDesktopState((state) => state.updateWindowSize);

  // Memoize handlers to preserve reference stability and prevent unnecessary DesktopWindow re-renders
  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);
  const handleFocus = useCallback(() => focusWindow(windowId), [focusWindow, windowId]);
  const handleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleMaximize = useCallback(() => maximizeWindow(windowId), [maximizeWindow, windowId]);
  const handleRestore = useCallback(() => restoreWindow(windowId), [restoreWindow, windowId]);
  const handlePositionChange = useCallback((pos: { x: number; y: number }) => updateWindowPosition(windowId, pos), [updateWindowPosition, windowId]);
  const handleSizeChange = useCallback((size: { width: number; height: number }) => updateWindowSize(windowId, size), [updateWindowSize, windowId]);

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

WindowWrapper.displayName = "WindowWrapper";

const WindowManager = memo(function WindowManager() {
  const openWindows = useDesktopState((state) => state.openWindows);

  const windows = React.useMemo(() => {
    return openWindows.map((windowId) => (
      <WindowWrapper key={windowId} windowId={windowId} />
    ));
  }, [openWindows]);

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      {windows}
    </div>
  );
});

export default WindowManager;
