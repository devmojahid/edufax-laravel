import React from "react";
import {
  IconBrowserCheck,
  IconExclamationCircle,
  IconNotification,
  IconPalette,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import SidebarNav from "./SidebarNav";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = ({ children }) => {
  return (
    <AdminLayout>
      <Card className="title-card">
        <CardHeader className="title-card-head">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Dashboard</CardTitle>
            </div>
            <div>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
          {children}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: "/settings/profile",
  },
  {
    title: "Account",
    icon: <IconTool size={18} />,
    href: "/settings/account",
  },
  {
    title: "Configurations",
    icon: <IconPalette size={18} />,
    href: "/settings/configurations",
  },
  {
    title: "Notifications",
    icon: <IconNotification size={18} />,
    href: "/settings/notifications",
  },
  {
    title: "Display",
    icon: <IconBrowserCheck size={18} />,
    href: "/settings/display",
  },
  {
    title: "Error Example",
    icon: <IconExclamationCircle size={18} />,
    href: "/settings/error-example",
  },
];
