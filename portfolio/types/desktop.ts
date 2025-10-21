import type { ComponentType } from "react";

export type DesktopWindowId =
  | "shop"
  | "lookbook"
  | "about"
  | "contact"
  | "cart";

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
