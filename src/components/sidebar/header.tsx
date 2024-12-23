/** @format */

"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg">
            <div className=" aspect-square size-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              <Image
                src="/logo.png"
                alt="Logo"
                width={44}
                height={44}
                className="object-cover rounded-full"
              />
            </div>
            <SidebarHeader className="text-xl font-bold">
              Point of sale
            </SidebarHeader>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          side={isMobile ? "bottom" : "right"}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            <p className="text-lg">สาขาทั้งหมด</p>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-2">ขอนแก่น</DropdownMenuItem>
          <DropdownMenuItem className="p-2">อุบล</DropdownMenuItem>

          {/* bottom */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">
              เพิ่มสาขา
            </div>
          </DropdownMenuItem>
          {/* end bottom */}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
}
