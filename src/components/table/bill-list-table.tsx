/** @format */

import { OrderType } from "@/server-actions/order";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { dayjsUtils } from "@/utils/date.utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { saleUtils } from "@/utils/sale.util";

export default async function BillsListTable(props: {
  orders: OrderType[];
}) {
  const { orders } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการบิลที่เปิดค้าง</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[100px]">รหัสบิล</TableHead>
              <TableHead className="w-[100px]">ลูกค้า</TableHead>
              <TableHead className="w-[100px]">วันที่เปิดบิล</TableHead>
              <TableHead className="w-[100px]">สถาณะ</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => {
                if (order.status === "PENDING") {
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="text-end">
                        {index + 1}
                      </TableCell>
                      <TableCell>{order.orderCode}</TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>
                        {dayjsUtils.autoFormat(order.createdAt)}
                      </TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-center">
                        <Button asChild>
                          <Link
                            href={saleUtils.orderSaleSearchParamsFormat({
                              orderId: order.id,
                              orderCode: order.orderCode,
                              customerId: order.customer.id,
                            })}
                          >
                            <Eye />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })
            ) : (
              <p>** ไม่มีรายการที่เปิดค้าง **</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
