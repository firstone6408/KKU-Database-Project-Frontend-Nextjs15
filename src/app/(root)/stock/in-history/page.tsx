/** @format */

import StockInContainer from "@/components/(root)/stock-in/stock-in-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function StockInHistoryPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockInContainer />
    </Suspense>
  );
}
