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
import {
  DeliveryDriverType,
  DeliveryType,
} from "@/server-actions/delivery";
import { dayjsUtils } from "@/utils/date.utils";
import { deliveryUtils } from "@/utils/delivery.utils";
import { Button } from "../ui/button";
import { Check, Eye, ScrollText, UserPlus } from "lucide-react";
import { DeliveryDetailsDialog } from "../dialog/delivery/delivery-details";
import { DeliveryAddDriverDialog } from "../dialog/delivery/delivery-add-driver";
import { Session } from "next-auth";
import {
  DeliveryStatusType,
  OrderTypeType,
  UserRole,
} from "@/configs/enum.config";
import { DeliveryDoneDialog } from "../dialog/delivery/delivery-done";
import { DocumentDialog } from "../dialog/report/document";
import { tableUtils } from "@/utils/table.utils";

export default function DeliveryListTable(props: {
  deliveries: DeliveryType[];
  driversAvailable: DeliveryDriverType[];
  session: Session;
}) {
  const {
    deliveries,
    driversAvailable,
    session: { user },
  } = props;

  const isPermission =
    user.role === UserRole.ADMIN ||
    user.role === UserRole.MANAGER ||
    user.role === UserRole.STAFF;

  const calculatePriceFromOrder = (delivery: DeliveryType) => {
    if (
      delivery.order.type === OrderTypeType.DEPOSITED &&
      delivery.order.totalPrice &&
      delivery.order.PaymentOrder?.deposit
    ) {
      return (
        delivery.order.totalPrice - delivery.order.PaymentOrder.deposit
      ).toLocaleString();
    }
    return "0";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>งานขนส่งทั้งหมด</CardTitle>
      </CardHeader>
      <div className="overflow-x-auto">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px] text-end">ลำดับ</TableHead>
                <TableHead className="w-[100px]">หมายเลขติดตาม</TableHead>
                <TableHead className="w-[100px] text-center">
                  ประเภท
                </TableHead>
                <TableHead className="w-[100px]">วันที่ต้อส่ง</TableHead>
                <TableHead className="w-[100px]">สถาณะ</TableHead>
                <TableHead className="w-[30px] text-end">
                  จำนวนคนส่ง
                </TableHead>
                <TableHead className="w-[180px] text-center">
                  จัดการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.length > 0
                ? deliveries.map((delivery, index) => (
                    <TableRow key={delivery.trackNumber}>
                      <TableCell className="text-end">
                        {index + 1}
                      </TableCell>
                      <TableCell>{delivery.trackNumber}</TableCell>
                      <TableCell className="text-center">
                        {deliveryUtils.deliveryTypeFormatter(
                          delivery.type
                        )}
                      </TableCell>
                      <TableCell>
                        {dayjsUtils.autoFormat(delivery.sendDate)}
                      </TableCell>
                      <TableCell>
                        {deliveryUtils.deliveryStatusFormatter(
                          delivery.status
                        )}
                      </TableCell>
                      <TableCell className="text-end">
                        {delivery.DeliveryDriver.length}
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        {delivery.status === DeliveryStatusType.PENDING &&
                          isPermission && (
                            <DeliveryAddDriverDialog
                              driversAvailable={driversAvailable}
                              delivery={delivery}
                              btn={
                                <Button variant={"outline"}>
                                  <UserPlus />
                                </Button>
                              }
                            />
                          )}
                        {delivery.status ===
                          DeliveryStatusType.PENDING && (
                          <DeliveryDoneDialog
                            delivery={delivery}
                            calculatePriceFromOrder={
                              calculatePriceFromOrder
                            }
                            btn={
                              <Button variant={"outline"}>
                                <Check />
                              </Button>
                            }
                          />
                        )}
                        <DocumentDialog
                          orderId={delivery.order.id}
                          btn={
                            <Button variant={"outline"}>
                              <ScrollText />
                            </Button>
                          }
                        />
                        <DeliveryDetailsDialog
                          btn={
                            <Button>
                              <Eye />
                            </Button>
                          }
                          delivery={delivery}
                          calculatePriceFromOrder={calculatePriceFromOrder}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : tableUtils.tableRowEmpty(7)}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
}
