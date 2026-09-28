import type { ComponentType } from "react";

export type DesktopWindowId =
  | "projects"
  | "achievements"
  | "resume"
  | "about"
  | "contact"
  | "terminal"
  | "notepad"
  | "paint"
  | "credits";

export interface DesktopWindowConfig {
  id: DesktopWindowId;
  title: string;
  iconSrc: string;
  component: ComponentType;
}

export type DesktopIconId = DesktopWindowId | "blog";

export interface DesktopIconConfig {
  id: DesktopIconId;
  label: string;
  iconSrc: string;
  /** If present, clicking the icon navigates here instead of opening a window. */
  href?: string;
}
