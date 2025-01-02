/** @format */

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/header";
import MainContainer from "@/components/main-container";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserRole, UserStatus } from "@/configs/enum.config";
import { fetchBranches } from "@/server-actions/branch";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    //console.log("1");
    redirect("/auth/login");
  } else if (session.user.status !== UserStatus.ACTIVE) {
    //console.log("12");
    redirect("/auth/branch-sign-in");
  } else if (
    !session.user.branchId &&
    session.user.role !== UserRole.ADMIN
  ) {
    //console.log("123");
    redirect("/auth/branch-sign-in");
  }

  const branches = await fetchBranches();

  return (
    <SidebarProvider>
      <AppSidebar branches={branches} />
      <SidebarInset>
        <div className="w-full">
          <Header />
          <MainContainer>{children}</MainContainer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
