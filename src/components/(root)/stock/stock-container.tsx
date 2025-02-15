/** @format */

import StocksListTable from "@/components/table/stock-list-table";
import { fetchStockProducts } from "@/server-actions/stock";
import StockSearch from "./stock-search";
import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/session.utils";
import { UserRole } from "@/configs/enum.config";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function StockContainer() {
  const stockProducts = await fetchStockProducts();
  const session = await getSession();
  //console.log(stockProducts);
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <StockSearch />
        {session.user.role === UserRole.ADMIN && (
          <Button>
            <Plus />
            <Link href={"/stock/add"}>เพิ่มสินค้าเข้า Stock</Link>
          </Button>
        )}
      </div>
      <StocksListTable stockProducts={stockProducts} session={session} />
    </>
  );
}
