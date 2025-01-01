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

export async function AppSidebar() {
  const session = await getSession();
  return (
    <Sidebar collapsible="icon" className="shadow">
      {/* logo */}
      <SidebarHeader>
        <Header />
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
