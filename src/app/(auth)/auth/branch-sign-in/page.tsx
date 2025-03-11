/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BranchAddDialog } from "@/components/dialog/branch/branch-add";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import BranchListSignInTable from "@/components/table/branch-list-sign-in-table";
import { Button } from "@/components/ui/button";
import { fetchBranches } from "@/server-actions/branch";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function BranchSignInPage() {
  const session = await getServerSession(authOptions);

  // console.log(session);

  if (!session) {
    redirect("/auth/login");
  }

  const branches = await fetchBranches();

  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <BranchListSignInTable branches={branches} session={session} />
    </Suspense>
  );
}
