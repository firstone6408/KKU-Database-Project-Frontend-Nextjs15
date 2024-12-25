/** @format */

import { navLinks } from "@/schemas/nav-links.d";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import StockMenuList from "./sub-menu-list/stock";

export default function Content() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu list</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navLinks.map((item, index) => {
            if (item.subLinks) {
              return <StockMenuList key={index} navLink={item} />;
            } else {
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href ?? ""}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
