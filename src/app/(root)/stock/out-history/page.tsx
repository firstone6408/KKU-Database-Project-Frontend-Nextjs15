/** @format */

import StockOutContainer from "@/components/(root)/stock-out/stock-out-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type StockOutHistoryPageSearchParams = {
  orderCode: string;
  startDate: string;
  endDate: string;
};

type StockOutHistoryPageProps = {
  searchParams: Promise<StockOutHistoryPageSearchParams>;
};

export default async function StockOutHistoryPage({
  searchParams,
}: StockOutHistoryPageProps) {
  const search = await searchParams;
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockOutContainer searchParams={search} />
    </Suspense>
  );
}
