/** @format */

import StocksListTable from "@/components/table/stock-list-table";
import { fetchStocks } from "@/server-actions/stock";
import StockSearch from "./stock-search";
import { StockAddDialog } from "@/components/dialog/stock/stock-add";
import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/session.utils";
import { UserRole } from "@/configs/enum.config";

export default async function StockContainer() {
  const stocks = await fetchStocks();
  const session = await getSession();
  //console.log(stocks);
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <StockSearch />
        {session.user.role === UserRole.ADMIN && (
          <StockAddDialog btn={<Button>เพิ่ม สินค้าเข้า Stock</Button>} />
        )}
      </div>
      <StocksListTable stocks={stocks} session={session} />
    </>
  );
}
