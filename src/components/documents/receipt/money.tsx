/** @format */
import { OrderType } from "@/server-actions/order";
import { Card, CardContent } from "../../ui/card";
import { ReceiptsAndDeliveryNotesType } from ".";

type DocumentReceiptMoneyProps = {
  order: OrderType;
  type: ReceiptsAndDeliveryNotesType;
};

export default function DocumentReceiptMoney({
  order,
  type,
}: DocumentReceiptMoneyProps) {
  const balance =
    (order.totalPrice ?? 0) -
    (order.PaymentOrder?.deposit ?? 0) -
    (order.PaymentOrder?.discount ?? 0);

  return (
    <Card>
      <CardContent>
        <section className="flex justify-between p-3">
          <div className="text-start w-[50%]">
            <h3 className="font-semibold text-red-600">** หมายเหตุ</h3>
            <p>{order.note}</p>
          </div>
          <div className="w-[30%]">
            <p className="flex justify-between items-center">
              <span>ราคาทั้งหมด</span>
              <span>{order.totalPrice?.toLocaleString() ?? 0} บาท</span>
            </p>
            <p className="flex justify-between items-center">
              <span>ส่วนลด</span>
              <span>
                {order.PaymentOrder?.discount?.toLocaleString() ?? 0} บาท
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span>มัดจำ</span>
              <span>
                {order.PaymentOrder?.deposit?.toLocaleString() ?? 0} บาท
              </span>
            </p>
            <p className="flex justify-between items-center text-lg font-semibold">
              <span>ยอดคงเหลือ</span>
              <span>{balance.toLocaleString() ?? 0} บาท</span>
            </p>
          </div>
        </section>
        <hr className="my-2 border" />
        <section className="flex justify-around items-center">
          <div>
            <p>......................................................</p>
            <p className="flex justify-between items-center">
              <span>(</span>
              <span>)</span>
            </p>
            <p className="text-center">ผู้ซื้อ/ผู้รับของ</p>
          </div>
          <div>
            <p>......................................................</p>
            <p className="flex justify-between items-center">
              <span>(</span>
              <span>)</span>
            </p>
            <p className="text-center">ผู้รับเงิน/ผู้ขาย</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
