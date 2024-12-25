/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BranchListSignInTable from "@/components/table/BranchListSignInTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BranchSignInPage() {
  const session = await getServerSession(authOptions);

  //console.log(session);

  if (!session) {
    redirect("/auth/login");
  }

  return <BranchListSignInTable />;
}
