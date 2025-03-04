/** @format */

import StocksListTable from "@/components/table/stock-list-table";
import { fetchStockProducts } from "@/server-actions/stock";
import StockSearch from "./stock-search";
import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/session.utils";
import { UserRole } from "@/configs/enum.config";
import Link from "next/link";
import { Plus } from "lucide-react";
import { StockPageSearchParams } from "@/app/(root)/stock/page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type StockContainerProps = {
  searchParams: StockPageSearchParams;
};

export default async function StockContainer({
  searchParams,
}: StockContainerProps) {
  const stockProducts = await fetchStockProducts({ searchParams });
  const session = await getSession();
  //console.log(stockProducts);
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader className="font-semibold">
          ค้นหาสำหรับ Stock
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <StockSearch />
          {session.user.role === UserRole.ADMIN && (
            <Button>
              <Plus />
              <Link href={"/stock/add"}>เพิ่มสินค้าเข้า Stock</Link>
            </Button>
          )}
        </CardContent>
      </Card>
      <StocksListTable stockProducts={stockProducts} session={session} />
    </div>
  );
}
