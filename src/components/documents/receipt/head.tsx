/** @format */

import { BranchType } from "@/server-actions/branch";
import { OrderType } from "@/server-actions/order";
import { dayjsUtils } from "@/utils/date.utils";
import Image from "next/image";
import { ReceiptsAndDeliveryNotesType } from ".";

type DocumentReceiptHeadProps = {
  branch: BranchType;
  order: OrderType;
  type: ReceiptsAndDeliveryNotesType;
};

export default function DocumentReceiptHead({
  branch,
  order,
  type,
}: DocumentReceiptHeadProps) {
  const title =
    type === "Receipt" ? "ใบเสนอราคา / ใบเสร็จรับเงิน" : "ใบขนส่ง";

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <section className="flex justify-between items-center">
        <Image
          src={"/images/sinchai/sinchaiLogo.png"}
          alt="sinchai-logo"
          width={100}
          height={100}
        />
        <div className="text-end">
          <h2 className="font-semibold text-xl">
            สินชัยกิจพาณิชย์ สาขา{branch.name}
          </h2>
          <p>ที่อยู่: {branch.address}</p>
          <p>เบอร์โทร: {branch.phoneNumber}</p>
        </div>
      </section>
      <hr className="my-3 border border-black" />
      <section className="flex justify-between items-start">
        <div className="text-start">
          <p>รหัสลูกค้า: {order.customer.customerCode}</p>
          <p>ที่อยู่: {order.customer.address}</p>
        </div>
        <div className="text-end">
          <p>วันที่สั่ง: {dayjsUtils.autoFormat(order.createdAt)}</p>
          <p>รหัสใบสั่งซื้อ: {order.orderCode}</p>
          <p>พนังงานขาย: {order.user.name}</p>
          <p>
            <span>เงื่อนไข: </span>
            <span>
              {order.PaymentOrder?.credit ? (
                <>
                  เครดิต {order.PaymentOrder?.credit?.toLocaleString()} วัน
                </>
              ) : (
                <>เงินสด</>
              )}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
