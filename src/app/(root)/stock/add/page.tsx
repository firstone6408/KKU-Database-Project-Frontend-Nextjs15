/** @format */

import StockAddContainer from "@/components/(root)/stock-add/stock-add-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function AddStockPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockAddContainer />
    </Suspense>
  );
}
