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

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
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
        <Footer />
      </SidebarFooter>
      {/* end footer */}
    </Sidebar>
  );
}
