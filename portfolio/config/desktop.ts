import AboutWindow from "@/components/windows/AboutWindow";
import AchievementsWindow from "@/components/windows/AchievementsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
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
];

export const desktopIcons: DesktopIconConfig[] = desktopWindows.map(
  ({ id, title, iconSrc }) => ({
    id,
    label: title,
    iconSrc,
  })
);

export const desktopWindowRecord = desktopWindows.reduce(
  (acc, windowConfig) => {
    acc[windowConfig.id] = windowConfig;
    return acc;
  },
  {} as Record<DesktopWindowId, DesktopWindowConfig>
);
