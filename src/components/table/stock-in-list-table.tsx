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
import { Eye, Trash } from "lucide-react";
import { StockInHistoryDetailsDialog } from "../dialog/stock-in/stock-in-details";
import { Button } from "../ui/button";
import { getSession } from "@/utils/session.utils";
import { UserRole } from "@/configs/enum.config";
import { StockInHistoryCancelDialog } from "../dialog/stock-in/stock-in-cancel";

export default async function StockInHistoriesListTable({
  stockInHistories,
}: {
  stockInHistories: StockInHistoryType[];
}) {
  const session = await getSession();

  // console.log(session);
  // console.log(
  //   "User Role:",
  //   session.user.role === UserRole.ADMIN ||
  //     session.user.role === UserRole.MANAGER
  // );

  const isAdminOrManager =
    session.user.role === UserRole.ADMIN ||
    session.user.role === UserRole.MANAGER;

  const isCanceledText = (isCanceled: boolean) => {
    if (isCanceled) {
      return <p className="text-red-500 font-semibold">ยกเลิก</p>;
    } else {
      return <p className="text-green-500 font-semibold">ปกติ</p>;
    }
  };

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
              <TableHead className="w-[60px]">รหัสนำเข้า</TableHead>
              <TableHead className="w-[100px]">ผู้จัดจำหน่าย</TableHead>
              <TableHead className="w-[20px]">ประเภท</TableHead>
              <TableHead className="w-[70px] text-end">
                จำนวนสินค้า
              </TableHead>
              <TableHead className="w-[80px] text-end">
                จำนวนเงินทั้งหมด
              </TableHead>
              <TableHead className="w-[100px]">นำเข้าโดย</TableHead>
              <TableHead className="w-[110px]">วันที่</TableHead>
              <TableHead className="w-[70px] text-center">สถาณะ</TableHead>
              <TableHead className="w-[70px] text-center">
                Option
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockInHistories.length > 0 ? (
              stockInHistories.map((stockIn, index) => {
                const canceledText = isCanceledText(stockIn.isCanceled);
                return (
                  <TableRow key={stockIn.id}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>{stockIn.refCode}</TableCell>
                    <TableCell>{stockIn.distributor}</TableCell>
                    <TableCell>{stockIn.type}</TableCell>
                    <TableCell className="text-end">
                      {stockIn.StockInItem.length.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-end">
                      {stockIn.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>{stockIn.user.name}</TableCell>
                    <TableCell>
                      {dayjsUtils.autoFormat(stockIn.createdAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      {canceledText}
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <StockInHistoryDetailsDialog
                        btn={
                          <Button>
                            <Eye />
                          </Button>
                        }
                        stockIn={stockIn}
                      />
                      {isAdminOrManager && !stockIn.isCanceled && (
                        <StockInHistoryCancelDialog
                          btn={
                            <Button variant={"destructive"}>
                              <Trash />
                            </Button>
                          }
                          stockIn={stockIn}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <p className="text-red-700">** ไม่มีการนำเข้า **</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
