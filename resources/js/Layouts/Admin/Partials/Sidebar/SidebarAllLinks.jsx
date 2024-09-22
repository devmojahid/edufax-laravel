import {
  IconApps,
  IconBoxSeam,
  IconChecklist,
  IconLayoutDashboard,
  IconMessages,
  IconPencilCheck,
  IconPhotoScan,
  IconRouteAltLeft,
  IconTruck,
  IconUsersGroup,
} from "@tabler/icons-react";

export const SidebarLinks = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <IconUsersGroup size={18} />,
  },
  {
    title: "Content Generator",
    href: "/ai/content-generator",
    icon: <IconPencilCheck size={18} />,
  },
  {
    title: "Image Generator",
    href: "/ai/image-generator",
    icon: <IconPhotoScan size={18} />,
  },
  {
    title: "Companion",
    href: "/ai/companion",
    icon: <IconMessages size={18} />,
  },
  {
    title: "All Templates",
    href: "/ai/content-templates",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "All Generators",
    href: "/all-gnerators",
    icon: <IconApps size={18} />,
  },
  {
    title: "Settings",
    href: "/sub-menu",
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: "Profile",
        href: "/settings/profile",
        icon: <IconTruck size={18} />,
      },
      {
        title: "Account",
        label: "",
        href: "/settings/account",
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
];
