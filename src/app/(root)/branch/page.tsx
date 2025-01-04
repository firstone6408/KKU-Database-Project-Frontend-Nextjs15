/** @format */

import BranchContainer from "@/components/(root)/branch/branch-container";
import CustomerLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function BranchPage() {
  return (
    <Suspense fallback={<CustomerLoadingSkeleton />}>
      <BranchContainer />
    </Suspense>
  );
}
