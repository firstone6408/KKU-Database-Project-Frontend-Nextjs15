/** @format */
import { saleUtils } from "@/utils/sale.util";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { OrderType } from "@/server-actions/order";
import { ReceiptsAndDeliveryNotesType } from ".";
import { productUtils } from "@/utils/product.utils";

type DocumentReceiptTableProps = {
  order: OrderType;
  type: ReceiptsAndDeliveryNotesType;
};

export default function DocumentReceiptTable({
  order,
  type,
}: DocumentReceiptTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t-2 border-b-2 border-black">
          <TableHead className="font-semibold text-black text-center">
            ลำดับ
          </TableHead>
          <TableHead className="font-semibold text-black">
            รายการ
          </TableHead>
          <TableHead className="font-semibold text-black text-center">
            ขนาด
          </TableHead>
          <TableHead className="font-semibold text-black text-center">
            รุ่น
          </TableHead>
          <TableHead className="font-semibold text-black text-end">
            จำนวน
          </TableHead>
          {type === "Receipt" && (
            <>
              <TableHead className="font-semibold text-black text-end">
                ราคา
              </TableHead>
              <TableHead className="font-semibold text-black text-end">
                ราคารวม
              </TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.StockOutHistory.length > 0 ? (
          order.StockOutHistory.map((orderItem, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{orderItem.product.name}</TableCell>
              <TableCell className="text-center">
                {orderItem.product.size}
              </TableCell>
              <TableCell className="text-center">
                {orderItem.product.model}
              </TableCell>
              <TableCell className="text-end">
                {`${orderItem.quantity.toLocaleString()} ${productUtils.productUnitFormatter(
                  orderItem.product.unit
                )}`}
              </TableCell>
              {type === "Receipt" && (
                <>
                  <TableCell className="text-end">
                    {orderItem.sellPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end">
                    {(
                      orderItem.sellPrice * orderItem.quantity
                    ).toLocaleString()}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))
        ) : (
          <span>ไม่มี</span>
        )}
      </TableBody>
    </Table>
  );
}
