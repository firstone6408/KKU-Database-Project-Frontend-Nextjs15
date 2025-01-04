/** @format */

import StocksListTable from "@/components/table/stock-list-table";
import { fetchStocks } from "@/server-actions/stock";

export default async function StockContainer() {
  const stocks = await fetchStocks();
  console.log(stocks);
  return (
    <>
      <StocksListTable stocks={stocks} />
    </>
  );
}
