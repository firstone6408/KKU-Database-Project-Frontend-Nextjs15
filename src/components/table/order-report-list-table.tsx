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
import { OrderType } from "@/server-actions/order";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { productUtils } from "@/utils/product.utils";
import { tableUtils } from "@/utils/table.utils";

export default function OrderReportListTable({
  orderItems,
}: {
  orderItems: OrderType["StockOutHistory"];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายละเอียดสินค้า</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[80px]">หมวดหมู่</TableHead>
              <TableHead className="w-[100px] text-center">รูป</TableHead>
              <TableHead className="w-[100px]">Barcode</TableHead>
              <TableHead className="w-[100px]">รหัสสินค้า</TableHead>
              <TableHead className="w-[80px]">ขนาด</TableHead>
              <TableHead className="w-[100px]">รุ่น</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px] text-end">
                ราคาขาย (บาท)
              </TableHead>
              <TableHead className="w-[100px] text-end">จำนวน</TableHead>
              <TableHead className="w-[100px] text-end">
                ราคา (บาท)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.length > 0
              ? orderItems.map((orderItem, index) => (
                  <TableRow key={orderItem.product.id}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>
                      {orderItem.product.category.name}
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Image
                        className="object-cover rounded-xl border p-1"
                        src={urlConfig.showImage(orderItem.product.image)}
                        width={60}
                        height={60}
                        alt={`Image-${orderItem.product.productCode}`}
                      />
                    </TableCell>
                    <TableCell>{orderItem.product.barcode}</TableCell>
                    <TableCell>{orderItem.product.productCode}</TableCell>
                    <TableCell>{orderItem.product.size}</TableCell>
                    <TableCell>{orderItem.product.model}</TableCell>
                    <TableCell>{orderItem.product.name}</TableCell>
                    <TableCell className="text-end">
                      {orderItem.sellPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-end">
                      {`${orderItem.quantity.toLocaleString()} ${productUtils.productUnitFormatter(
                        orderItem.product.unit
                      )}`}
                    </TableCell>
                    <TableCell className="text-end">
                      {(
                        orderItem.quantity * orderItem.sellPrice
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(11)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
