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
import { getSession } from "@/utils/session.utils";

export default async function Content() {
  const user = (await getSession()).user;
  const userRole = user.role;
  //console.log("user:", user);

  const filteredNavLinks = navLinks.filter(
    (link) => !link.permission || link.permission.includes(userRole)
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>เมนูทั้งหมด</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {filteredNavLinks.map((item, index) => {
            if (item.subLinks) {
              return <StockMenuList key={index} navLink={item} />;
            } else {
              if (item.type && item.type === "hidden") {
                return;
              }
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href ?? ""}>
                      <span className="sidebar-icon">{item.icon}</span>
                      <span className="sidebar-text">{item.title}</span>
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
