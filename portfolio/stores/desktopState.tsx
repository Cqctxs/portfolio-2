"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { DesktopWindowId } from "@/types/desktop";

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowState = {
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  // Store pre-maximize state for restore
  preMaximizePosition?: WindowPosition;
  preMaximizeSize?: WindowSize;
};

type DesktopStateShape = {
  openWindows: DesktopWindowId[];
  focusedWindow: DesktopWindowId | null;
  windowStates: Record<DesktopWindowId, WindowState>;
  openWindow: (id: DesktopWindowId) => void;
  closeWindow: (id: DesktopWindowId) => void;
  toggleWindow: (id: DesktopWindowId) => void;
  focusWindow: (id: DesktopWindowId) => void;
  minimizeWindow: (id: DesktopWindowId) => void;
  maximizeWindow: (id: DesktopWindowId) => void;
  restoreWindow: (id: DesktopWindowId) => void;
  updateWindowPosition: (id: DesktopWindowId, position: WindowPosition) => void;
  updateWindowSize: (id: DesktopWindowId, size: WindowSize) => void;
};

const DesktopStateContext = createContext<DesktopStateShape | undefined>(
  undefined
);

// Default window sizes and positions
const DEFAULT_WINDOW_SIZE: WindowSize = { width: 500, height: 400 };

let nextZIndex = 1;

function getInitialWindowState(index: number): WindowState {
  // Cascade windows with offset
  const offset = index * 30;
  return {
    position: { x: 180 + offset, y: 50 + offset },
    size: { ...DEFAULT_WINDOW_SIZE },
    zIndex: nextZIndex++,
    isMinimized: false,
    isMaximized: false,
  };
}

export function DesktopStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openWindows, setOpenWindows] = useState<DesktopWindowId[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<DesktopWindowId | null>(
    null
  );
  const [windowStates, setWindowStates] = useState<
    Record<DesktopWindowId, WindowState>
  >({} as Record<DesktopWindowId, WindowState>);

  const openWindow = useCallback((id: DesktopWindowId) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) {
        // Window already open, just restore if minimized
        return prev;
      }
      return [...prev, id];
    });

    setWindowStates((prev) => {
      if (prev[id]) {
        // Window state exists, restore if minimized and update zIndex
        return {
          ...prev,
          [id]: { ...prev[id], zIndex: nextZIndex++, isMinimized: false },
        };
      }
      // Create new window state
      const openCount = Object.keys(prev).length;
      return {
        ...prev,
        [id]: getInitialWindowState(openCount),
      };
    });

    setFocusedWindow(id);
  }, []);

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setOpenWindows((prev) => prev.filter((windowId) => windowId !== id));
    setFocusedWindow((prev) => (prev === id ? null : prev));
  }, []);

  const toggleWindow = useCallback((id: DesktopWindowId) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((windowId) => windowId !== id);
      }
      return [...prev, id];
    });

    setWindowStates((prev) => {
      if (!prev[id]) {
        const openCount = Object.keys(prev).length;
        return {
          ...prev,
          [id]: getInitialWindowState(openCount),
        };
      }
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: nextZIndex++ },
      };
    });

    setFocusedWindow((prev) => (prev === id ? null : id));
  }, []);

  const focusWindow = useCallback((id: DesktopWindowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZIndex++, isMinimized: false },
    }));
    setFocusedWindow(id);
  }, []);

  const minimizeWindow = useCallback((id: DesktopWindowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    setFocusedWindow((prev) => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id: DesktopWindowId) => {
    setWindowStates((prev) => {
      const current = prev[id];
      if (current.isMaximized) {
        // Already maximized, restore to previous size
        return {
          ...prev,
          [id]: {
            ...current,
            isMaximized: false,
            position: current.preMaximizePosition || current.position,
            size: current.preMaximizeSize || current.size,
          },
        };
      }
      // Maximize: save current state and go fullscreen (accounting for 40px taskbar)
      return {
        ...prev,
        [id]: {
          ...current,
          isMaximized: true,
          preMaximizePosition: current.position,
          preMaximizeSize: current.size,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 40 },
        },
      };
    });
    setFocusedWindow(id);
  }, []);

  const restoreWindow = useCallback((id: DesktopWindowId) => {
    setWindowStates((prev) => {
      const current = prev[id];
      if (!current) return prev;

      // If maximized, restore to previous size/position
      if (current.isMaximized) {
        return {
          ...prev,
          [id]: {
            ...current,
            isMinimized: false,
            isMaximized: false,
            position: current.preMaximizePosition || current.position,
            size: current.preMaximizeSize || current.size,
            zIndex: nextZIndex++,
          },
        };
      }

      // Otherwise just restore from minimized state
      return {
        ...prev,
        [id]: { ...current, isMinimized: false, zIndex: nextZIndex++ },
      };
    });
    setFocusedWindow(id);
  }, []);

  const updateWindowPosition = useCallback(
    (id: DesktopWindowId, position: WindowPosition) => {
      setWindowStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], position },
      }));
    },
    []
  );

  const updateWindowSize = useCallback(
    (id: DesktopWindowId, size: WindowSize) => {
      setWindowStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], size },
      }));
    },
    []
  );

  const value = useMemo(
    () => ({
      openWindows,
      focusedWindow,
      windowStates,
      openWindow,
      closeWindow,
      toggleWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      openWindows,
      focusedWindow,
      windowStates,
      openWindow,
      closeWindow,
      toggleWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return (
    <DesktopStateContext.Provider value={value}>
      {children}
    </DesktopStateContext.Provider>
  );
}

export function useDesktopState() {
  const context = useContext(DesktopStateContext);
  if (!context) {
    throw new Error("useDesktopState must be used within DesktopStateProvider");
  }
  return context;
}
