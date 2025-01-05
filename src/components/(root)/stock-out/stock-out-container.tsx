/** @format */

import StockOutHistoriesListTable from "@/components/table/stock-out-list-table";
import { fetchStockOutHistories } from "@/server-actions/stock-out-history";

export default async function StockOutContainer() {
  const stockOutHistories = await fetchStockOutHistories();
  console.log(stockOutHistories);
  return (
    <>
      <StockOutHistoriesListTable stockOutHistories={stockOutHistories} />
    </>
  );
}
