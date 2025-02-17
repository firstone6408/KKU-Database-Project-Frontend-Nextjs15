/** @format */

import StockInHistoriesListTable from "@/components/table/stock-in-list-table";
import { fetchStockInHistories } from "@/server-actions/stock-in-history";
import StockInHistorySearch from "./stock-in-search";

export default async function StockInContainer() {
  const stockInHistories = await fetchStockInHistories();

  //console.log(stockInHistories);
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <StockInHistorySearch />
      </div>
      <StockInHistoriesListTable stockInHistories={stockInHistories} />
    </>
  );
}
