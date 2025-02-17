/** @format */

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLinkType } from "@/schemas/nav-links.d";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type StockMenuListProps = {
  navLink: NavLinkType;
};

export default function StockMenuList({ navLink }: StockMenuListProps) {
  if (!navLink.subLinks) {
    throw new Error("subLinks not found");
  }
  return (
    <>
      <Collapsible asChild className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {navLink.icon}
              <span>{navLink.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {navLink.subLinks.length > 0 &&
                navLink.subLinks.map((item, index) => {
                  if (item.type && item.type === "hidden") {
                    return;
                  }
                  return (
                    <SidebarMenuSubItem key={index}>
                      <SidebarMenuSubButton asChild>
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}
