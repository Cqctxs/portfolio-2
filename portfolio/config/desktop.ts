import AboutWindow from "@/components/windows/AboutWindow";
import CartWindow from "@/components/windows/CartWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import LookbookWindow from "@/components/windows/LookbookWindow";
import ShopWindow from "@/components/windows/ShopWindow";
import type {
  DesktopIconConfig,
  DesktopWindowConfig,
  DesktopWindowId,
} from "@/types/desktop";

export const desktopWindows: DesktopWindowConfig[] = [
  {
    id: "shop",
    title: "Shop",
    iconSrc: "/icons/shop.png",
    component: ShopWindow,
  },
  {
    id: "lookbook",
    title: "Lookbook",
    iconSrc: "/icons/lookbook.png",
    component: LookbookWindow,
  },
  {
    id: "about",
    title: "About",
    iconSrc: "/icons/about.png",
    component: AboutWindow,
  },
  {
    id: "contact",
    title: "Contact",
    iconSrc: "/icons/contact.png",
    component: ContactWindow,
  },
  {
    id: "cart",
    title: "Cart",
    iconSrc: "/icons/cart.png",
    component: CartWindow,
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
