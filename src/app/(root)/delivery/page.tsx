/** @format */

import DeliveryContainer from "@/components/(root)/delivery/delivery-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function DeliveryPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <DeliveryContainer />
    </Suspense>
  );
}
