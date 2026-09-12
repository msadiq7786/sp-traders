import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SiteHeader } from "@/components/site-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  Box,
  CircleCheckIcon,
  CircleXIcon,
  Clock3Icon,
  LayoutDashboardIcon,
  PackageCheckIcon,
  User2Icon,
} from "lucide-react";
import React from "react";

interface PropsType {
  children: React.ReactNode;
}

const sidebarContent = {
  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: <Box />,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <User2Icon />,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: <PackageCheckIcon />,
    },
  ],
  status: [
    {
      name: "Pending",
      url: "/orders?status=pending",
      icon: <Clock3Icon className="text-yellow-500" />,
    },
    {
      name: "Accepted",
      url: "/orders?status=accepted",
      icon: <CircleCheckIcon className="text-blue-500" />,
    },
    {
      name: "Delivered",
      url: "/orders?status=delivered",
      icon: <PackageCheckIcon className="text-green-500" />,
    },
    {
      name: "rejected",
      url: "/orders?status=rejected",
      icon: <CircleXIcon className="text-red-500" />,
    },
  ],
};
function UserLayout({ children }: PropsType) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="data-[slot=sidebar-menu-button]:p-1.5!"
                render={<a href="#" />}
              >
                <span className="text-base font-semibold uppercase">
                  SP Traders -Admin
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <React.Suspense fallback={null}>
            <NavMain items={sidebarContent.navMain} />
          </React.Suspense>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SiteHeader />
        <div className="flex min-h-svh flex-col gap-6 px-4 py-6 lg:px-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default UserLayout;
