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

  const filteredNavLinks = navLinks.filter(
    (link) => !link.permission || link.permission.includes(userRole)
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu list</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {filteredNavLinks.map((item, index) => {
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
