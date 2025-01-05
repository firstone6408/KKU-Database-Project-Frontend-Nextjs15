/** @format */

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StockType } from "@/server-actions/stock";
import { Button } from "../ui/button";
import { Eye, Pen, Plus } from "lucide-react";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { StockDetailsDialog } from "../dialog/stock/stock-details";
import { StockInHistoryAddDialog } from "../dialog/stock-in/stock-in-add";
import { Session } from "next-auth";
import { AdjustPriceDialog } from "../dialog/product-sale-branch/adjust-price";
import { UserRole } from "@/configs/enum.config";

export default function StocksListTable({
  stocks,
  session,
}: {
  stocks: StockType[];
  session: Session;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>สินค้าใน Stock ทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัส</TableHead>
              <TableHead className="w-[100px]">หมวดหมู่</TableHead>
              <TableHead className="w-[100px]">รูป</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px] text-end">
                ราคาขาย (บาท)
              </TableHead>
              <TableHead className="w-[100px] text-end">คงเหลือ</TableHead>
              <TableHead className="w-[150px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.length > 0 &&
              stocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.product.productCode}</TableCell>
                  <TableCell>{stock.product.category.name}</TableCell>
                  <TableCell>
                    {stock.product.image && (
                      <Image
                        src={urlConfig.showImage(stock.product.image)}
                        width={60}
                        height={60}
                        className="object-cover rounded-xl border p-1"
                        alt={stock.product.name}
                      />
                    )}
                  </TableCell>
                  <TableCell>{stock.product.name}</TableCell>
                  <TableCell className="text-end">
                    {stock.sellPrice}
                  </TableCell>
                  <TableCell className="text-end">
                    {stock.product.Stock[0].quantity}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <StockDetailsDialog
                      stock={stock}
                      btn={
                        <Button>
                          <Eye />
                        </Button>
                      }
                    />
                    <StockInHistoryAddDialog
                      stock={stock}
                      btn={
                        <Button variant={"outline"}>
                          <Plus />
                        </Button>
                      }
                    />
                    {session.user.role === UserRole.ADMIN && (
                      <AdjustPriceDialog
                        stock={stock}
                        btn={
                          <Button variant={"outline"}>
                            <Pen />
                          </Button>
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
