import type { ComponentType } from "react";

export type DesktopWindowId =
  | "projects"
  | "achievements"
  | "resume"
  | "about"
  | "contact"
  | "terminal"
  | "notepad"
  | "paint";

export interface DesktopWindowConfig {
  id: DesktopWindowId;
  title: string;
  iconSrc: string;
  component: ComponentType;
}

export interface DesktopIconConfig {
  id: DesktopWindowId;
  label: string;
  iconSrc: string;
}
