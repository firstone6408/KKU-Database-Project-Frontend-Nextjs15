/** @format */

import CustomerContainer from "@/components/(root)/customer/customer-container";
import CustomerLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function CustomerPage() {
  return (
    <Suspense fallback={<CustomerLoadingSkeleton />}>
      <CustomerContainer />
    </Suspense>
  );
}
