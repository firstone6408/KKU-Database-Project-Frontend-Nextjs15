/** @format */

import StockOutContainer from "@/components/(root)/stock-out/stock-out-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function StockOutHistory() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockOutContainer />
    </Suspense>
  );
}
