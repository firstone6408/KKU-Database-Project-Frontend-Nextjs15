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
import { StockOutHistoryType } from "@/server-actions/stock-out-history";
import { dayjsUtils } from "@/utils/date.utils";

export default function StockOutHistoriesListTable({
  stockOutHistories,
}: {
  stockOutHistories: StockOutHistoryType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ประวัติ Stock นำออก</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[70px]">รหัสสินค้า</TableHead>
              <TableHead className="w-[100px]">หมวดหมู่</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">ประเภท</TableHead>
              <TableHead className="w-[100px] text-end">จำนวน</TableHead>
              <TableHead className="w-[100px]">วันที่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockOutHistories.length > 0 &&
              stockOutHistories.map((stockOut, index) => (
                <TableRow key={stockOut.id}>
                  <TableCell className="text-end">{index + 1}</TableCell>
                  <TableCell>
                    {stockOut.stock.product.productCode}
                  </TableCell>
                  <TableCell>
                    {stockOut.stock.product.category.name}
                  </TableCell>
                  <TableCell>{stockOut.stock.product.name}</TableCell>
                  <TableCell>{stockOut.type}</TableCell>
                  <TableCell className="text-end">
                    {stockOut.quantity}
                  </TableCell>
                  <TableCell>
                    {dayjsUtils.autoFormat(stockOut.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
