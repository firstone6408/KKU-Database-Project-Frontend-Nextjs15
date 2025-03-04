/** @format */

import { CustomerType } from "@/server-actions/customer";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DeliveryType } from "@/server-actions/delivery";
import { dayjsUtils } from "@/utils/date.utils";

export default function DeliveryDriverWorkListTable(props: {
  deliveryDriver: DeliveryType["DeliveryDriver"];
}) {
  const { deliveryDriver } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายละเอียดพนักงานที่ขนส่ง</CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px] text-end">ลำดับ</TableHead>
                <TableHead className="w-[100px]">ชื่อผู้ส่ง</TableHead>
                <TableHead className="w-[100px]">เบอร์</TableHead>
                <TableHead className="w-[100px]">วันที่มอบหมาย</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryDriver.length > 0 ? (
                deliveryDriver.map((driver, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>{driver.user.name}</TableCell>
                    <TableCell>{driver.user.phoneNumber}</TableCell>
                    <TableCell>
                      {dayjsUtils.autoFormat(driver.assignedAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    -- ยังไม่ได้มอบหมาย --
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}
