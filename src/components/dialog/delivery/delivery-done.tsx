/** @format */

import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormFile from "@/components/form/form-file";
import FormInput from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";
import {
  deliveryDoneAction,
  DeliveryType,
} from "@/server-actions/delivery";
import { Check } from "lucide-react";

export function DeliveryDoneDialog(props: {
  btn: React.JSX.Element;
  delivery: DeliveryType;
  calculatePriceFromOrder: (delivery: DeliveryType) => string;
}) {
  const { btn, delivery, calculatePriceFromOrder } = props;

  const isPayment =
    delivery.order.type === OrderTypeType.DEPOSITED &&
    delivery.order.status === OrderStatusType.UNPAID;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-lg">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>หมายเหตุ</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>
        {/* content */}
        <FormContainer action={deliveryDoneAction} className="space-y-2">
          {isPayment && (
            <>
              <FormInput
                name="s"
                label="จำนวนคงเหลือที่ต้องชำระ (บาท)"
                defaultValue={calculatePriceFromOrder(delivery)}
                disabled
                required
              />
              <FormFile
                label="หลักฐานการชำระเงิน"
                name="slipImage"
                required
                accept="image/*"
              />
            </>
          )}
          <input
            type="hidden"
            name="orderId"
            defaultValue={delivery.orderId}
            required
          />

          <div className="flex flex-col justify-end py-5">
            <h2>กด "เสร็จสิ้น" หากส่งถึงแล้ว</h2>
            <Button type="submit">
              <Check />
              เสร็จสิ้น
            </Button>
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
