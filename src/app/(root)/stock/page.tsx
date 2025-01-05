/** @format */

import StockContainer from "@/components/(root)/stock/stock-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function StockPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockContainer />
    </Suspense>
  );
}
