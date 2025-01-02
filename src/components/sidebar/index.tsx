/** @format */

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import { getSession } from "@/utils/session.utils";
import { BranchType } from "@/server-actions/branch";

export async function AppSidebar({
  branches,
}: {
  branches: BranchType[];
}) {
  const session = await getSession();
  return (
    <Sidebar collapsible="icon" className="shadow">
      {/* logo */}
      <SidebarHeader>
        <Header branches={branches} />
      </SidebarHeader>
      {/* end logo */}

      <SidebarContent>
        {/* content */}
        <Content />
        {/* end content */}
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <Footer session={session} />
      </SidebarFooter>
      {/* end footer */}
    </Sidebar>
  );
}
