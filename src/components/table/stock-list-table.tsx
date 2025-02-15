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
import { StockProductType } from "@/server-actions/stock";
import { Button } from "../ui/button";
import { DollarSign, Eye, Pen, Plus } from "lucide-react";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { StockDetailsDialog } from "../dialog/stock/stock-details";
import { Session } from "next-auth";
import { AdjustPriceDialog } from "../dialog/product-sale-branch/adjust-price";
import { UserRole } from "@/configs/enum.config";

export default function StocksListTable({
  stockProducts,
  session,
}: {
  stockProducts: StockProductType[];
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
            {stockProducts.length > 0 &&
              stockProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productCode}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    {product.image && (
                      <Image
                        src={urlConfig.showImage(product.image)}
                        width={60}
                        height={60}
                        className="object-cover rounded-xl border p-1"
                        alt={product.name}
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-end">
                    {product.ProductSaleBranch.length > 0
                      ? product.ProductSaleBranch[0].sellPrice
                      : "ยังไม่ได้กำหนดราคา"}
                  </TableCell>
                  <TableCell className="text-end">
                    {product.Stock.length > 0
                      ? product.Stock[0].quantity
                      : "ไม่มีสินค้า"}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <StockDetailsDialog
                      stockProduct={product}
                      btn={
                        <Button>
                          <Eye />
                        </Button>
                      }
                    />
                    {session.user.role === UserRole.ADMIN && (
                      <AdjustPriceDialog
                        stockProduct={product}
                        btn={
                          <Button variant={"outline"}>
                            <DollarSign />
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
