/** @format */

import StockOutHistoriesListTable from "@/components/table/stock-out-list-table";
import { fetchOrdersByBranchId } from "@/server-actions/order";

export default async function StockOutContainer() {
  const stockOutHistories = await fetchOrdersByBranchId();
  // console.log(stockOutHistories);
  return (
    <>
      <StockOutHistoriesListTable stockOutHistories={stockOutHistories} />
    </>
  );
}
