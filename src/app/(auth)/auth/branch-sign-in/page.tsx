/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BranchListSignInTable from "@/components/table/branch-list-sign-in-table";
import { fetchBranches } from "@/server-actions/branch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BranchSignInPage() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    redirect("/auth/login");
  }

  const branches = await fetchBranches();

  return <BranchListSignInTable branches={branches} />;
}
