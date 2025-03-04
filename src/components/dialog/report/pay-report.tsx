/** @format */

import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormFile from "@/components/form/form-file";
import FormInput from "@/components/form/form-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";
import { OrderType, payOrderAction } from "@/server-actions/order";
import { orderUtils } from "@/utils/order.util";
import { Check } from "lucide-react";

export function PayReportDialog(props: {
  btn: any;
  report: OrderType;
  title?: string;
}) {
  const { btn, report, title } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {title ? title : "ชำระเงิน"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={payOrderAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="ประเภทการชำระเงิน"
              defaultValue={orderUtils.orderTypeFormatter(report.type)}
              disabled
            />
            <FormInput
              label="สถาณะ"
              defaultValue={orderUtils.orderStatusFormatter(report.status)}
              disabled
            />
            <FormInput
              className="col-span-full"
              label="จำนวนเงินทั้งหมด (บาท)"
              defaultValue={report.totalPrice}
              disabled
            />
            {report.status === OrderStatusType.COMPLETED ? (
              <p className="col-span-full text-green-500 text-center my-2">
                -- ชำระเงินแล้ว --
              </p>
            ) : (
              <>
                {report.type &&
                  // มัดจำ
                  (report.type === OrderTypeType.DEPOSITED ? (
                    <>
                      <FormInput
                        label="มัดจำ (บาท)"
                        defaultValue={report.PaymentOrder?.deposit?.toLocaleString()}
                        disabled
                      />
                      <FormInput
                        label="จำนวนที่ต้องชำระ (บาท)"
                        defaultValue={
                          report.totalPrice &&
                          report.PaymentOrder?.deposit &&
                          (
                            report.totalPrice -
                            report.PaymentOrder?.deposit
                          ).toLocaleString()
                        }
                        disabled
                      />
                    </>
                  ) : // เครดิต
                  report.type === OrderTypeType.CREDIT_USED ? (
                    <>
                      <FormInput
                        label="เครดิต (วัน)"
                        defaultValue={report.PaymentOrder?.credit}
                        disabled
                      />
                      <FormInput
                        label="จำนวนที่ต้องชำระ (บาท)"
                        defaultValue={report.totalPrice?.toLocaleString()}
                        disabled
                      />
                    </>
                  ) : // มัดจำ + เครดิต
                  report.type === OrderTypeType.DEPOSITED_CREDIT_USED ? (
                    <>
                      <FormInput
                        label="มัดจำ (บาท)"
                        defaultValue={report.PaymentOrder?.deposit?.toLocaleString()}
                        disabled
                      />
                      <FormInput
                        label="เครดิต (วัน)"
                        defaultValue={report.PaymentOrder?.credit}
                        disabled
                      />
                      <FormInput
                        className="col-span-full"
                        label="จำนวนที่ต้องชำระ (บาท)"
                        defaultValue={
                          report.totalPrice &&
                          report.PaymentOrder?.deposit &&
                          (
                            report.totalPrice -
                            report.PaymentOrder?.deposit
                          ).toLocaleString()
                        }
                        disabled
                      />
                    </>
                  ) : (
                    <>-- ไม่มีรายการ --</>
                  ))}
              </>
            )}
            {report.status !== OrderStatusType.COMPLETED && (
              <>
                <FormFile
                  className="col-span-full"
                  label="หลักฐานการชำระเงิน"
                  name="slipImage"
                  accept="/image/*"
                  required
                />
              </>
            )}
          </div>
          {report.status !== OrderStatusType.COMPLETED && (
            <div className="flex justify-end">
              <input
                name="orderId"
                type="hidden"
                defaultValue={report.id}
                required
              />
              <FormButton
                btnText={
                  <span className="flex justify-center items-center gap-2">
                    <Check />
                    บันทึก
                  </span>
                }
              />
            </div>
          )}
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
