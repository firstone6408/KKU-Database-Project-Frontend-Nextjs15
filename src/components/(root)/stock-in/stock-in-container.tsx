/** @format */

import StockInHistoriesListTable from "@/components/table/stock-in-list-table";
import { fetchStockInHistories } from "@/server-actions/stock-in-history";
import StockInHistorySearch from "./stock-in-search";
import { StockInHistoryPageSearchParams } from "@/app/(root)/stock/in-history/page";

type StockInContainerProps = {
  searchParams: StockInHistoryPageSearchParams;
};

export default async function StockInContainer({
  searchParams,
}: StockInContainerProps) {
  const stockInHistories = await fetchStockInHistories({ searchParams });

  //console.log(stockInHistories);
  return (
    <div className="space-y-2">
      <StockInHistorySearch />

      <StockInHistoriesListTable stockInHistories={stockInHistories} />
    </div>
  );
}
