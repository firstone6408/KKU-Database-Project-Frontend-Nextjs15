/** @format */

import { PaymentMethodType } from "@/server-actions/payment-method";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { PaymentMethodAddDialog } from "../dialog/payment-method/payment-method-add";
import { Pen } from "lucide-react";
import { tableUtils } from "@/utils/table.utils";

export default function PaymentMethodsListTable({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>หมวดหมู่ทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods.length > 0
              ? paymentMethods.map((paymentMethod, index) => (
                  <TableRow key={paymentMethod.id}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>{paymentMethod.name}</TableCell>
                    <TableCell className="text-center">
                      <PaymentMethodAddDialog
                        btn={
                          <Button>
                            <Pen />
                          </Button>
                        }
                        paymentMethod={paymentMethod}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(3)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
