import type { ComponentType } from "react";

export type DesktopWindowId =
  | "projects"
  | "achievements"
  | "resume"
  | "about"
  | "contact";

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
