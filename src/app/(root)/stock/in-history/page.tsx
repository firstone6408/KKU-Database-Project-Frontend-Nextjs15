/** @format */

import StockInContainer from "@/components/(root)/stock-in/stock-in-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type StockInHistoryPageSearchParams = {
  refCode: string;
  distributor: string;
  startDate: String;
  endDate: String;
  isCanceled: string;
};

type StockInHistoryPageProps = {
  searchParams: Promise<StockInHistoryPageSearchParams>;
};

export default async function StockInHistoryPage({
  searchParams,
}: StockInHistoryPageProps) {
  const search = await searchParams;
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockInContainer searchParams={search} />
    </Suspense>
  );
}
