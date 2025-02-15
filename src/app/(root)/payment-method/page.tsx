/** @format */

import PaymentMethodContainer from "@/components/(root)/payment-method/payment-method-container";
import { Suspense } from "react";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";

export default function PaymentMethodPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <PaymentMethodContainer />
    </Suspense>
  );
}
