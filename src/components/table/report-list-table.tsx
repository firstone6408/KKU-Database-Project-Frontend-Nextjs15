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
import { DollarSign, Eye, ScrollText } from "lucide-react";
import { OrderReportDialog } from "../dialog/report/order-report";
import { OrderStatusType } from "@/configs/enum.config";
import { orderUtils } from "@/utils/order.util";
import { PayReportDialog } from "../dialog/report/pay-report";
import { DocumentDialog } from "../dialog/report/document";
import { tableUtils } from "@/utils/table.utils";

export default function ReportListTable({
  reports,
}: {
  reports: OrderType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายงานขาย</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">รหัสใบสั่งซื้อ</TableHead>
              <TableHead className="w-[70px]">กลุ่มลูกค้า</TableHead>
              <TableHead className="w-[100px]">ชื่อลูกค้า</TableHead>
              <TableHead className="w-[70px]">ประเภท</TableHead>
              <TableHead className="w-[70px]">สถาณะ</TableHead>
              <TableHead className="w-[100px]">ผู้ใช้</TableHead>
              <TableHead className="w-[120px]">วันที่สร้าง</TableHead>
              <TableHead className="w-[80px] text-end">
                จำนวนเงินทั้งหมด (บาท)
              </TableHead>
              <TableHead className="w-[50px] text-center">
                Options
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.length > 0
              ? reports.map((report) => {
                  if (report.status !== OrderStatusType.PENDING)
                    return (
                      <TableRow key={report.id}>
                        <TableCell>{report.orderCode}</TableCell>
                        <TableCell>
                          {report.customer.customerGroup.name}
                        </TableCell>
                        <TableCell>{report.customer.name}</TableCell>
                        <TableCell>
                          {report.type
                            ? orderUtils.orderTypeFormatter(report.type)
                            : "-- ไม่มี --"}
                        </TableCell>
                        <TableCell
                          className={`${
                            report.status === OrderStatusType.COMPLETED
                              ? "text-green-500"
                              : report.status === OrderStatusType.UNPAID
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {orderUtils.orderStatusFormatter(report.status)}
                        </TableCell>
                        <TableCell>{report.user.name}</TableCell>
                        <TableCell>
                          {dayjsUtils.autoFormat(report.createdAt)}
                        </TableCell>
                        <TableCell className="text-end">
                          {report.totalPrice?.toLocaleString()}
                        </TableCell>
                        <TableCell className="flex justify-center gap-2">
                          <PayReportDialog
                            report={report}
                            btn={
                              <Button variant={"outline"}>
                                {<DollarSign />}
                              </Button>
                            }
                          />
                          {report.status === OrderStatusType.COMPLETED && (
                            <DocumentDialog
                              orderId={report.id}
                              btn={
                                <Button variant={"outline"}>
                                  <ScrollText />
                                </Button>
                              }
                            />
                          )}
                          <OrderReportDialog
                            btn={
                              <Button>
                                <Eye />
                              </Button>
                            }
                            order={report}
                          />
                        </TableCell>
                      </TableRow>
                    );
                })
              : tableUtils.tableRowEmpty(9)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
