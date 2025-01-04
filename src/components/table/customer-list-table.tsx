/** @format */

import { CustomerType } from "@/server-actions/customer";
import { Eye, UserPen } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomerDetailsDialog } from "../dialog/customer/customer-details";

export default function CustomersListTable(props: {
  customers: CustomerType[];
}) {
  const { customers } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>ลูกค้าทั้งหมด</CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">รหัส</TableHead>
                <TableHead className="w-[100px]">กลุ่ม</TableHead>
                <TableHead className="w-[100px]">ชื่อ</TableHead>
                <TableHead className="w-[100px]">เบอร์</TableHead>
                <TableHead className="w-[100px]">เพิ่มโดย</TableHead>
                <TableHead className="w-[100px] text-center">
                  จัดการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length > 0 &&
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.customerCode}</TableCell>
                    <TableCell>{customer.customerGroup?.name}</TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.user?.name}</TableCell>
                    <TableCell className="text-center">
                      <Button size={"default"} asChild>
                        <CustomerDetailsDialog
                          btn={
                            <Button>
                              <Eye />
                            </Button>
                          }
                          customer={customer}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}
