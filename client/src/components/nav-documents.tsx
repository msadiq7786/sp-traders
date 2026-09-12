"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";

export function NavDocuments({
  items,
  title,
}: {
  items: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
  title: string;
}) {
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status");
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              render={<a href={item.url} />}
              isActive={currentStatus === item.name.toLowerCase()}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
