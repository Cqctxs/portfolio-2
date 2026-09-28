import AboutWindow from "@/components/windows/AboutWindow";
import AchievementsWindow from "@/components/windows/AchievementsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import NotepadWindow from "@/components/windows/NotepadWindow";
import PaintWindow from "@/components/windows/PaintWindow";
import CreditsWindow from "@/components/windows/CreditsWindow";
import type {
  DesktopIconConfig,
  DesktopWindowConfig,
  DesktopWindowId,
} from "@/types/desktop";

export const desktopWindows: DesktopWindowConfig[] = [
  {
    id: "about",
    title: "About Me",
    iconSrc: "/icons/win98/about.ico",
    component: AboutWindow,
  },
  {
    id: "projects",
    title: "Projects",
    iconSrc: "/icons/win98/projects.ico",
    component: ProjectsWindow,
  },
  {
    id: "achievements",
    title: "Achievements",
    iconSrc: "/icons/win98/achievements.ico",
    component: AchievementsWindow,
  },
  {
    id: "resume",
    title: "Resume",
    iconSrc: "/icons/win98/resume.ico",
    component: ResumeWindow,
  },
  {
    id: "contact",
    title: "Contact",
    iconSrc: "/icons/win98/contact.ico",
    component: ContactWindow,
  },
  {
    id: "terminal",
    title: "Terminal",
    iconSrc: "/icons/win98/terminal.ico",
    component: TerminalWindow,
  },
  {
    id: "notepad",
    title: "Notepad",
    iconSrc: "/icons/win98/notepad.ico",
    component: NotepadWindow,
  },
  {
    id: "paint",
    title: "Paint",
    iconSrc: "/icons/win98/paint.ico",
    component: PaintWindow,
  },
  {
    id: "credits",
    title: "Credits",
    iconSrc: "/icons/win98/computer.ico",
    component: CreditsWindow,
  },
] as const;

const windowIcons: DesktopIconConfig[] = desktopWindows
  .filter((window) => window.id !== "credits") // Exclude credits from desktop icons
  .map(({ id, title, iconSrc }) => ({
    id,
    label: title,
    iconSrc,
  }));

// Link-style icons that navigate to their own route instead of opening a window.
const routeIcons: DesktopIconConfig[] = [
  {
    id: "blog",
    label: "Blog",
    iconSrc: "/icons/win98/pen.ico",
    href: "/blog",
  },
];

export const desktopIcons: DesktopIconConfig[] = [...windowIcons, ...routeIcons];

export const desktopWindowRecord = desktopWindows.reduce(
  (acc, windowConfig) => {
    acc[windowConfig.id] = windowConfig;
    return acc;
  },
  {} as Record<DesktopWindowId, DesktopWindowConfig>
);
