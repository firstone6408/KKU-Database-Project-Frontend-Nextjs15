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

export default function StockInHistoriesDetailsTable({
  stockInHistories,
}: {
  stockInHistories: StockInHistoryType;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายละเอียดรายการนำเข้า</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[100px]">รหัสสินค้า</TableHead>
              <TableHead className="w-[85px]">ประเภทสินค้า</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[80px]">รุ่น</TableHead>
              <TableHead className="w-[80px]">ขนาด</TableHead>
              <TableHead className="w-[80px]">หน่วย</TableHead>
              <TableHead className="w-[80px] text-end">จำนวน</TableHead>
              <TableHead className="w-[105px] text-end">
                ราคาต้นทุน(บาท)
              </TableHead>
              <TableHead className="w-[100px] text-end">
                ราคารวม(บาท)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockInHistories.StockInItem.length > 0 ? (
              stockInHistories.StockInItem.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-end">
                    {(index + 1).toLocaleString()}
                  </TableCell>
                  <TableCell>{item.product.productCode}</TableCell>
                  <TableCell>{item.product.category.name}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.model}</TableCell>
                  <TableCell>{item.product.size}</TableCell>
                  <TableCell>{item.product.unit}</TableCell>
                  <TableCell className="text-end">
                    {item.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end">
                    {item.costPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end">
                    {(item.quantity * item.costPrice).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p className="text-red-700">** ไม่มีรายการ **</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
