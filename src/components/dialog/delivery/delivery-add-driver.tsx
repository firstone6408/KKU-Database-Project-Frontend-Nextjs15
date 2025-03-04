/** @format */

"use client";

import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import DeliveryDriverAvailableListTable from "@/components/table/delivery-driver-available";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addDeliveryDriversAction,
  DeliveryDriverType,
  DeliveryType,
} from "@/server-actions/delivery";
import { useState } from "react";

export function DeliveryAddDriverDialog(props: {
  btn: React.JSX.Element;
  delivery: DeliveryType;
  driversAvailable: DeliveryDriverType[];
}) {
  const { btn, delivery, driversAvailable } = props;
  const [driverIds, setDriverIds] = useState<string[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-xl">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>เพิ่มคนขนส่ง</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>
        {/* content */}
        <FormContainer
          action={addDeliveryDriversAction}
          className="space-y-2"
        >
          <input
            type="hidden"
            name="orderId"
            defaultValue={delivery.orderId}
            required
          />
          <input
            type="hidden"
            name="driversAvailable"
            defaultValue={
              driverIds.length >= 0 ? JSON.stringify(driverIds) : ""
            }
            required={driverIds.length <= 0}
          />
          <FormInput
            label="หมายเลขติดตาม"
            defaultValue={delivery.trackNumber}
            disabled
          />
          <div className="flex justify-end">
            <FormButton btnText={"บันทึก"} />
          </div>
        </FormContainer>
        <DeliveryDriverAvailableListTable
          deliveryDriver={driversAvailable}
          setDriverIds={setDriverIds}
          driverIds={driverIds}
        />
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
