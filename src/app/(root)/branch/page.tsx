/** @format */

import BranchContainer from "@/components/(root)/branch/branch-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function BranchPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <BranchContainer />
    </Suspense>
  );
}
