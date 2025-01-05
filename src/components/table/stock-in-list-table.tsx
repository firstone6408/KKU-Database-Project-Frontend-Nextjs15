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
import { dayjsUtils } from "@/utils/date.utils";
import { StockInHistoryType } from "@/server-actions/stock-in-history";

export default function StockInHistoriesListTable({
  stockInHistories,
}: {
  stockInHistories: StockInHistoryType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ประวัติ Stock นำเข้า</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[60px] text-end">
                รหัสนำเข้า
              </TableHead>
              <TableHead className="w-[100px]">หมวดหมู่</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[20px]">ประเภท</TableHead>
              <TableHead className="w-[100px] text-end">
                ต้นทุน(บาท)
              </TableHead>
              <TableHead className="w-[100px] text-end">จำนวน</TableHead>
              <TableHead className="w-[100px]">วันที่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockInHistories.length > 0 &&
              stockInHistories.map((stockIn, index) => (
                <TableRow key={stockIn.refCode}>
                  <TableCell className="text-end">{index + 1}</TableCell>
                  <TableCell className="text-end">
                    {stockIn.refCode}
                  </TableCell>
                  <TableCell>
                    {stockIn.stock.product.category.name}
                  </TableCell>
                  <TableCell>{stockIn.stock.product.name}</TableCell>
                  <TableCell>{stockIn.type}</TableCell>
                  <TableCell className="text-end">
                    {stockIn.costPrice}
                  </TableCell>
                  <TableCell className="text-end">
                    {stockIn.quantity}
                  </TableCell>
                  <TableCell>
                    {dayjsUtils.autoFormat(stockIn.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
