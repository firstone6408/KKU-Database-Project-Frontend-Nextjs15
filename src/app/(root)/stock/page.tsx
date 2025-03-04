/** @format */

import StockContainer from "@/components/(root)/stock/stock-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type StockPageSearchParams = {
  productCode: string;
  categoryId: string;
};

type StockPageProps = {
  searchParams: Promise<StockPageSearchParams>;
};

export default async function StockPage({ searchParams }: StockPageProps) {
  const search = await searchParams;
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <StockContainer searchParams={search} />
    </Suspense>
  );
}
