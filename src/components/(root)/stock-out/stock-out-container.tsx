/** @format */

import { StockOutHistoryPageSearchParams } from "@/app/(root)/stock/out-history/page";
import StockOutHistoriesListTable from "@/components/table/stock-out-list-table";
import { fetchOrdersByBranchId } from "@/server-actions/order";
import { StockOutSearch } from "./stock-out-search";
import { ReportPageSearchParams } from "@/app/(root)/report/page";

type StockOutContainerProps = {
  searchParams: StockOutHistoryPageSearchParams;
};

export default async function StockOutContainer({
  searchParams,
}: StockOutContainerProps) {
  const stockOutHistories = await fetchOrdersByBranchId({
    searchParams: searchParams as ReportPageSearchParams,
  });
  // console.log(stockOutHistories);
  return (
    <div className="space-y-2">
      <StockOutSearch />
      <StockOutHistoriesListTable stockOutHistories={stockOutHistories} />
    </div>
  );
}
