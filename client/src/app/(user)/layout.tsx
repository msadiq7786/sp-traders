import { NavDocuments } from "@/components/nav-documents";
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
import { RequireAuth } from "@/features/auth/require-auth";

import {
  Box,
  CircleCheckIcon,
  CircleXIcon,
  Clock3Icon,
  LayoutDashboardIcon,
  PackageCheckIcon,
} from "lucide-react";
import React from "react";

interface PropsType {
  children: React.ReactNode;
}

const sidebarContent = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: <Box />,
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
      name: "Rejected",
      url: "/orders?status=rejected",
      icon: <CircleXIcon className="text-red-500" />,
    },
  ],
};
function UserLayout({ children }: PropsType) {
  return (
    <RequireAuth>
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
                    SP Traders
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={sidebarContent.navMain} />
            <NavDocuments items={sidebarContent.status} title="Order Status" />
          </SidebarContent>
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <SiteHeader />

          {children}
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}

export default UserLayout;
