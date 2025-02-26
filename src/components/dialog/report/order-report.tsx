/** @format */

import FormImage from "@/components/form/form-image";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import OrderReportListTable from "@/components/table/order-report-list-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { urlConfig } from "@/configs/url.config";
import { OrderType } from "@/server-actions/order";
import { dayjsUtils } from "@/utils/date.utils";
import { orderUtils } from "@/utils/order.util";

export function OrderReportDialog(props: {
  btn: any;
  order: OrderType;
  title?: string;
}) {
  const { btn, order, title } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {title ? title : "รายละเอียดใบสั่งซื้อ"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <div className="grid grid-cols-3 gap-2">
          {/* Bill Details */}
          <h1 className="font-semibold text-lg col-span-full">บิล</h1>
          <FormInput
            className="col-span-full"
            label="รหัสใบสั่งซื้อ"
            defaultValue={order.orderCode}
            disabled
          />
          <FormInput
            className="col-span-2"
            label="รูปแบบการจ่าย"
            defaultValue={
              order.type && orderUtils.orderTypeFormatter(order.type)
            }
            disabled
          />
          <FormInput
            className="col-span-1"
            label="สถาณะ"
            defaultValue={orderUtils.orderStatusFormatter(order.status)}
            disabled
          />
          <FormTextArea
            className="col-span-full"
            rows={4}
            label="หมายเหตุ"
            defaultValue={order.note}
            disabled
          />
          {/* End Bill Details */}

          <hr className="col-span-full my-2" />

          {/* Customer Details */}
          <h1 className="font-semibold text-lg col-span-full">ลูกค้า</h1>
          <FormInput
            className="col-span-2"
            label="รหัสลูกค้า"
            defaultValue={order.customer.customerCode}
            disabled
          />
          <FormInput
            className="col-span-1"
            label="กลุ่ม"
            defaultValue={order.customer.customerGroup.name}
            disabled
          />
          <FormInput
            className="col-span-2"
            label="ชื่อ"
            defaultValue={order.customer.name}
            disabled
          />
          <FormInput
            className="col-span-1"
            label="เบอร์"
            defaultValue={order.customer.phoneNumber}
            disabled
          />
          {/* End Customer Details */}

          <hr className="col-span-full my-2" />

          {/* User Details */}
          <h1 className="font-semibold text-lg col-span-full">พนักงาน</h1>
          <FormInput
            className="col-span-1"
            label="ชื่อผู้ใช้"
            defaultValue={order.user.username}
            disabled
          />
          <FormInput
            className="col-span-2"
            label="ชื่อ"
            defaultValue={order.user.name}
            disabled
          />
          <FormInput
            className="col-span-full"
            label="อีเมล"
            defaultValue={order.user.email}
            disabled
          />
          {/* End User Details */}

          <hr className="col-span-full my-2" />

          {/* OrderItems */}
          <div className="col-span-full">
            <OrderReportListTable orderItems={order.StockOutHistory} />
          </div>
          {/* End OrderItems */}

          <hr className="col-span-full my-2" />

          {/* Payment Details */}
          <h1 className="font-semibold text-lg col-span-full">การชำระ</h1>
          <FormInput
            className="col-span-1"
            label="จำนวนเงินทั้งหมด (บาท)"
            defaultValue={order.totalPrice?.toLocaleString()}
            disabled
          />
          <FormInput
            className="col-span-1"
            label="จำนวนเงินที่จ่าย (บาท)"
            defaultValue={
              order.PaymentOrder?.amountRecevied
                ? order.PaymentOrder?.amountRecevied?.toLocaleString()
                : "-- ไม่มี --"
            }
            disabled
          />
          <FormInput
            className="col-span-1"
            label="เงินทอน (บาท)"
            defaultValue={
              order.PaymentOrder?.change
                ? order.PaymentOrder?.change?.toLocaleString()
                : "-- ไม่มี --"
            }
            disabled
          />

          <FormImage
            label="หลักฐานการชำระ"
            className="row-span-3 flex flex-col items-center gap-2"
            weight={150}
            height={150}
            src={urlConfig.showImage(order.PaymentOrder?.slipImage)}
            alt={`Slip-${order.orderCode}`}
          />
          <FormInput
            className="col-span-1"
            label="ส่วนลด (บาท)"
            defaultValue={
              order.PaymentOrder?.discount
                ? order.PaymentOrder?.discount?.toLocaleString()
                : "-- ไม่มี --"
            }
            disabled
          />
          <FormInput
            className="col-span-1"
            label="มัดจำ (บาท)"
            defaultValue={
              order.PaymentOrder?.deposit
                ? order.PaymentOrder?.deposit?.toLocaleString()
                : "-- ไม่มี --"
            }
            disabled
          />
          <FormInput
            className="col-span-1"
            label="เครดิต (วัน)"
            defaultValue={
              order.PaymentOrder?.credit
                ? order.PaymentOrder?.credit
                : "-- ไม่มี --"
            }
            disabled
          />
          <FormInput
            className="col-span-1"
            label="วันที่เริ่มสร้าง"
            defaultValue={
              order.PaymentOrder
                ? dayjsUtils.autoFormat(order.PaymentOrder?.createdAt)
                : ""
            }
            disabled
          />
          <FormInput
            className="col-span-2"
            label="วันที่จ่ายครบ"
            defaultValue={
              order.PaymentOrder && order.PaymentOrder?.paidAt
                ? dayjsUtils.autoFormat(order.PaymentOrder.paidAt)
                : "-- ยังไม่จ่าย --"
            }
            disabled
          />
          {/* End Payment Details */}
        </div>

        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
