"use client";

import React, { memo, useCallback } from "react";
import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

const WindowWrapper = memo(({
  windowId,
  windowConfig,
  windowState,
  isFocused,
  closeWindow,
  focusWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  updateWindowPosition,
  updateWindowSize,
}: any) => {
  const WindowComponent = windowConfig.component;

  const handleClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);
  const handleFocus = useCallback(() => focusWindow(windowId), [focusWindow, windowId]);
  const handleMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const handleMaximize = useCallback(() => maximizeWindow(windowId), [maximizeWindow, windowId]);
  const handleRestore = useCallback(() => restoreWindow(windowId), [restoreWindow, windowId]);
  const handlePositionChange = useCallback((pos: any) => updateWindowPosition(windowId, pos), [updateWindowPosition, windowId]);
  const handleSizeChange = useCallback((size: any) => updateWindowSize(windowId, size), [updateWindowSize, windowId]);

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

        return (
          <WindowWrapper
            key={windowId}
            windowId={windowId}
            windowConfig={windowConfig}
            windowState={windowState}
            isFocused={focusedWindow === windowId}
            closeWindow={closeWindow}
            focusWindow={focusWindow}
            minimizeWindow={minimizeWindow}
            maximizeWindow={maximizeWindow}
            restoreWindow={restoreWindow}
            updateWindowPosition={updateWindowPosition}
            updateWindowSize={updateWindowSize}
          />
        );
      })}
    </div>
  );
}
