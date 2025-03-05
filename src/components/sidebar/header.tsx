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
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { BranchType } from "@/server-actions/branch";
import { BranchSignInButton } from "../button/branch";
import { useSession } from "next-auth/react";

export default function Header({ branches }: { branches: BranchType[] }) {
  const { isMobile } = useSidebar();

  const { data: session } = useSession();

  // console.log("Session:", session);

  // console.log("ok");

  const branchUser = session
    ? branches.find((branch) => session.user.branchId === branch.id) ||
      null
    : null;

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
            <SidebarHeader className="gap-0">
              <h2 className="text-xl font-bold">Point of sale</h2>
              <p>
                สาขา: {branchUser ? branchUser.name : "ไม่ได้เลือกสาขา"}
              </p>
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
          {branches.length > 0 &&
            branches.map((branch) => (
              <DropdownMenuItem key={branch.id} className="p-2">
                <p>{branch.name}</p>
                {session?.user.branchId === branch.id ? (
                  <Check />
                ) : (
                  <BranchSignInButton branchId={branch.id} />
                )}
              </DropdownMenuItem>
            ))}

          {/* bottom */}
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">
              เพิ่มสาขา
            </div>
          </DropdownMenuItem> */}
          {/* end bottom */}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
}
