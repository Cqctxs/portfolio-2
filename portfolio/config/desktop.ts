import dynamic from "next/dynamic";
import type {
  DesktopIconConfig,
  DesktopWindowConfig,
  DesktopWindowId,
} from "@/types/desktop";

const AboutWindow = dynamic(() => import("@/components/windows/AboutWindow"), { ssr: false });
const AchievementsWindow = dynamic(() => import("@/components/windows/AchievementsWindow"), { ssr: false });
const ContactWindow = dynamic(() => import("@/components/windows/ContactWindow"), { ssr: false });
const ProjectsWindow = dynamic(() => import("@/components/windows/ProjectsWindow"), { ssr: false });
const ResumeWindow = dynamic(() => import("@/components/windows/ResumeWindow"), { ssr: false });
const TerminalWindow = dynamic(() => import("@/components/windows/TerminalWindow"), { ssr: false });
const NotepadWindow = dynamic(() => import("@/components/windows/NotepadWindow"), { ssr: false });
const PaintWindow = dynamic(() => import("@/components/windows/PaintWindow"), { ssr: false });
const CreditsWindow = dynamic(() => import("@/components/windows/CreditsWindow"), { ssr: false });

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

export const desktopIcons: DesktopIconConfig[] = desktopWindows
  .filter((window) => window.id !== "credits") // Exclude credits from desktop icons
  .map(({ id, title, iconSrc }) => ({
    id,
    label: title,
    iconSrc,
  }));

export const desktopWindowRecord = desktopWindows.reduce(
  (acc, windowConfig) => {
    acc[windowConfig.id] = windowConfig;
    return acc;
  },
  {} as Record<DesktopWindowId, DesktopWindowConfig>
);
