/** @format */

import CustomerGroupContainer from "@/components/(root)/customer-group/customer-group-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function CustomerGroupPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <CustomerGroupContainer />
    </Suspense>
  );
}
