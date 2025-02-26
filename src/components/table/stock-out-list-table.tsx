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
import { OrderType } from "@/server-actions/order";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { OrderReportDialog } from "../dialog/report/order-report";

export default function StockOutHistoriesListTable({
  stockOutHistories,
}: {
  stockOutHistories: OrderType[];
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
              <TableHead className="w-[70px]">รหัสใบสั่งซื้อ</TableHead>
              <TableHead className="w-[100px]">ผู้ใช้</TableHead>
              <TableHead className="w-[100px]">วันที่</TableHead>
              <TableHead className="w-[70px] text-end">
                จำนวนเงิน (บาท)
              </TableHead>
              <TableHead className="w-[50px] text-center">
                Options
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockOutHistories.length > 0 &&
              stockOutHistories.map((stockOut, index) => (
                <TableRow key={stockOut.id}>
                  <TableCell className="text-end">{index + 1}</TableCell>
                  <TableCell>{stockOut.orderCode}</TableCell>
                  <TableCell>{stockOut.user.username}</TableCell>
                  <TableCell>
                    {dayjsUtils.autoFormat(stockOut.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    {stockOut.totalPrice?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <OrderReportDialog
                      btn={
                        <Button>
                          <Eye />
                        </Button>
                      }
                      order={stockOut}
                      title="รายละเอียดประวัตินำออก"
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
