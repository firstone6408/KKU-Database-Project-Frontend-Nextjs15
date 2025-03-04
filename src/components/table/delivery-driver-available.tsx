/** @format */

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DeliveryDriverType } from "@/server-actions/delivery";
import { Input } from "../ui/input";

export default function DeliveryDriverAvailableListTable(props: {
  deliveryDriver: DeliveryDriverType[];
  driverIds: string[];
  setDriverIds: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { deliveryDriver, driverIds, setDriverIds } = props;

  const handleSelectDriver = (driverId: string) => {
    setDriverIds(
      (prev) =>
        prev.includes(driverId)
          ? prev.filter((id) => id !== driverId) // ลบออกถ้าติ๊กออก
          : [...prev, driverId] // เพิ่มเข้าไปถ้าติ๊ก
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายละเอียดพนักงานขนส่งที่ว่าง</CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px] text-end">ลำดับ</TableHead>
                <TableHead className="w-[100px]">ชื่อผู้ส่ง</TableHead>
                <TableHead className="w-[100px]">เบอร์</TableHead>
                <TableHead className="w-[100px] text-center">
                  มอบหมาย
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryDriver.length > 0 ? (
                deliveryDriver.map((driver, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell className="flex justify-center">
                      <Input
                        type="checkbox"
                        checked={driverIds.includes(driver.id)}
                        onChange={() => handleSelectDriver(driver.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    -- ไม่มีพนักงานขนส่งที่ว่าง --
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
