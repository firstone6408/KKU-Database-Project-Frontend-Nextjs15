/** @format */

import { CustomerType } from "@/server-actions/customer";
import { Check, Plus } from "lucide-react";
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

export default function CustomersListSetTable(props: {
  customers: CustomerType[];
  customerId?: string;
  setCustomerId: (customerId: string) => void;
}) {
  const { customers, setCustomerId, customerId } = props;

  const handleClick = (customer: CustomerType) => {
    // console.log(customer);
    setCustomerId(customer.id);
  };

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
                  <TableRow
                    key={customer.id}
                    className={`${
                      customerId && customerId === customer.id
                        ? "bg-green-600 hover:bg-green-600 rounded-lg overflow-hidden"
                        : ""
                    }`}
                  >
                    <TableCell>{customer.customerCode}</TableCell>
                    <TableCell>{customer.customerGroup?.name}</TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.user?.name}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        size={"default"}
                        type="button"
                        onClick={() => handleClick(customer)}
                        disabled={
                          customerId ? customerId === customer.id : false
                        }
                      >
                        {customerId && customerId === customer.id ? (
                          <Check />
                        ) : (
                          <Plus />
                        )}
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
