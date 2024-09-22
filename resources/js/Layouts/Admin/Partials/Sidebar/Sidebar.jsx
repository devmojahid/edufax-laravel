import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { SidebarLinks } from "./SidebarAllLinks";

const Sidebar = ({ isMobile = false }) => {
  const { url } = usePage();
  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  const isActive = (href) => url === href;

  return (
    <nav
      className={`flex flex-col ${
        isMobile ? "text-lg" : "text-sm font-medium"
      }`}
    >
      {SidebarLinks.map((item) => (
        <div key={item.href}>
          {/* Main Sidebar Link or Button */}
          {item.sub ? (
            <button
              onClick={() => handleToggle(item.title)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary w-full text-left ${
                (isMobile ? "text-muted-foreground" : "text-muted-foreground",
                isActive(item.href) ? "text-primary" : "")
              }`}
            >
              {item.icon}
              {item.title}
              {openMenu === item.title ? (
                <span className="ml-auto">
                  <ChevronDown />
                </span> // Down arrow
              ) : (
                <span className="ml-auto">
                  <ChevronRight />
                </span> // Right arrow
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isMobile ? "text-muted-foreground" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.title}
              {item.label && (
                <span className="ml-auto inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-500 text-white text-xs">
                  {item.label}
                </span>
              )}
            </Link>
          )}

          {/* Sub-menu Links */}
          {item.sub && openMenu === item.title && (
            <div className="ml-4 mt-2 space-y-1">
              {item.sub.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isMobile ? "text-muted-foreground" : "text-muted-foreground"
                  }`}
                >
                  {subItem.icon}
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
