import AboutWindow from "@/components/windows/AboutWindow";
import AchievementsWindow from "@/components/windows/AchievementsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import type {
  DesktopIconConfig,
  DesktopWindowConfig,
  DesktopWindowId,
} from "@/types/desktop";

export const desktopWindows: DesktopWindowConfig[] = [
  {
    id: "about",
    title: "About Me",
    iconSrc: "/icons/about.png",
    component: AboutWindow,
  },
  {
    id: "projects",
    title: "Projects",
    iconSrc: "/icons/lookbook.png",
    component: ProjectsWindow,
  },
  {
    id: "skills",
    title: "Skills & Experience",
    iconSrc: "/icons/shop.png",
    component: SkillsWindow,
  },
  {
    id: "achievements",
    title: "Achievements",
    iconSrc: "/icons/cart.png",
    component: AchievementsWindow,
  },
  {
    id: "resume",
    title: "Resume",
    iconSrc: "/file.svg",
    component: ResumeWindow,
  },
  {
    id: "contact",
    title: "Contact",
    iconSrc: "/icons/contact.png",
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
