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
import { Eye } from "lucide-react";
import { StockInHistoryDetailsDialog } from "../dialog/stock-in/stock-in-details";
import { Button } from "../ui/button";

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
              <TableHead className="w-[70px] text-center">
                Option
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockInHistories.length > 0 ? (
              stockInHistories.map((stockIn, index) => (
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
                  <TableCell className="flex justify-center">
                    <StockInHistoryDetailsDialog
                      btn={
                        <Button>
                          <Eye />
                        </Button>
                      }
                      stockIn={stockIn}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p className="text-red-700">** ไม่มีการนำเข้า **</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
