"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DesktopWindowId } from "@/types/desktop";

type DesktopStateShape = {
  openWindows: DesktopWindowId[];
  focusedWindow: DesktopWindowId | null;
  openWindow: (id: DesktopWindowId) => void;
  closeWindow: (id: DesktopWindowId) => void;
  toggleWindow: (id: DesktopWindowId) => void;
  focusWindow: (id: DesktopWindowId) => void;
};

const DesktopStateContext = createContext<DesktopStateShape | undefined>(
  undefined
);

export function DesktopStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openWindows, setOpenWindows] = useState<DesktopWindowId[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<DesktopWindowId | null>(
    null
  );

  const openWindow = (id: DesktopWindowId) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocusedWindow(id);
  };

  const closeWindow = (id: DesktopWindowId) => {
    setOpenWindows((prev) => prev.filter((windowId) => windowId !== id));
    setFocusedWindow((prev) => (prev === id ? null : prev));
  };

  const toggleWindow = (id: DesktopWindowId) => {
    setOpenWindows((prev) =>
      prev.includes(id)
        ? prev.filter((windowId) => windowId !== id)
        : [...prev, id]
    );
    setFocusedWindow((prev) => (prev === id ? null : id));
  };

  const focusWindow = (id: DesktopWindowId) => {
    setFocusedWindow(id);
  };

  const value = useMemo(
    () => ({
      openWindows,
      focusedWindow,
      openWindow,
      closeWindow,
      toggleWindow,
      focusWindow,
    }),
    [openWindows, focusedWindow]
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
