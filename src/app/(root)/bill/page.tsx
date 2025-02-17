/** @format */

import BillContainer from "@/components/(root)/bill/bill-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function BillPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <BillContainer />
    </Suspense>
  );
}
