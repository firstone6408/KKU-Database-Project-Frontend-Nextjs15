/** @format */

import { ProductType } from "@/server-actions/product";
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
import { ProductDetailsDialog } from "../dialog/product/product-details";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { StockDetailsDialog } from "../dialog/stock/product-details";

export default function StocksListTable({
  stocks,
}: {
  stocks: StockType[];
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
              <TableHead className="w-[100px]">ราคาขาย (บาท)</TableHead>
              <TableHead className="w-[100px]">คงเหลือ</TableHead>
              <TableHead className="w-[100px] text-center">
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
                  <TableCell>{stock.sellPrice}</TableCell>
                  <TableCell>{stock.product.Stock[0].quantity}</TableCell>
                  <TableCell className="text-center">
                    <StockDetailsDialog
                      stock={stock}
                      btn={
                        <Button>
                          <Eye />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
