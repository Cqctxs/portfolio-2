"use client";

import React, { memo, useCallback } from "react";
import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import DesktopWindow from "./DesktopWindow";

const WindowNode = memo(function WindowNode({
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
}: any) {
  const onClose = useCallback(() => closeWindow(windowId), [closeWindow, windowId]);
  const onFocus = useCallback(() => focusWindow(windowId), [focusWindow, windowId]);
  const onMinimize = useCallback(() => minimizeWindow(windowId), [minimizeWindow, windowId]);
  const onMaximize = useCallback(() => maximizeWindow(windowId), [maximizeWindow, windowId]);
  const onRestore = useCallback(() => restoreWindow(windowId), [restoreWindow, windowId]);
  const onPositionChange = useCallback((pos: any) => updateWindowPosition(windowId, pos), [updateWindowPosition, windowId]);
  const onSizeChange = useCallback((size: any) => updateWindowSize(windowId, size), [updateWindowSize, windowId]);

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
        onClose={onClose}
        onFocus={onFocus}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onRestore={onRestore}
        onPositionChange={onPositionChange}
        onSizeChange={onSizeChange}
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
          <WindowNode
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
