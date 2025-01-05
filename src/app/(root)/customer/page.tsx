/** @format */

import CustomerContainer from "@/components/(root)/customer/customer-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function CustomerPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <CustomerContainer />
    </Suspense>
  );
}
