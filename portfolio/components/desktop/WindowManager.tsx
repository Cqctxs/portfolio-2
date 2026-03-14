"use client";

import { desktopWindowRecord } from "@/config/desktop";
import { useDesktopState } from "@/stores/desktopState";
import { useShallow } from "zustand/react/shallow";
import DesktopWindow from "./DesktopWindow";

function WindowContainer({ windowId }: { windowId: string }) {
  const windowState = useDesktopState((state) => state.windowStates[windowId]);
  const isFocused = useDesktopState((state) => state.focusedWindow === windowId);
  const closeWindow = useDesktopState((state) => state.closeWindow);
  const focusWindow = useDesktopState((state) => state.focusWindow);
  const minimizeWindow = useDesktopState((state) => state.minimizeWindow);
  const maximizeWindow = useDesktopState((state) => state.maximizeWindow);
  const restoreWindow = useDesktopState((state) => state.restoreWindow);
  const updateWindowPosition = useDesktopState((state) => state.updateWindowPosition);
  const updateWindowSize = useDesktopState((state) => state.updateWindowSize);

  const windowConfig = desktopWindowRecord[windowId];

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
        onClose={() => closeWindow(windowId)}
        onFocus={() => focusWindow(windowId)}
        onMinimize={() => minimizeWindow(windowId)}
        onMaximize={() => maximizeWindow(windowId)}
        onRestore={() => restoreWindow(windowId)}
        onPositionChange={(pos) => updateWindowPosition(windowId, pos)}
        onSizeChange={(size) => updateWindowSize(windowId, size)}
      >
        <WindowComponent />
      </DesktopWindow>
    </div>
  );
}

export default function WindowManager() {
  const openWindows = useDesktopState(useShallow((state) => state.openWindows));

  return (
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      {openWindows.map((windowId) => (
        <WindowContainer key={windowId} windowId={windowId} />
      ))}
    </div>
  );
}
