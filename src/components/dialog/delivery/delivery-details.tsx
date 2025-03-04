/** @format */

import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import Map from "@/components/map/MapLeaflet";
import DeliveryDriverWorkListTable from "@/components/table/delivery-driver-work-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { OrderTypeType } from "@/configs/enum.config";
import { DeliveryType } from "@/server-actions/delivery";
import { dayjsUtils } from "@/utils/date.utils";
import { deliveryUtils } from "@/utils/delivery.utils";
import { orderUtils } from "@/utils/order.util";

export function DeliveryDetailsDialog(props: {
  btn: React.JSX.Element;
  delivery: DeliveryType;
  calculatePriceFromOrder: (delivery: DeliveryType) => string;
}) {
  const { btn, delivery, calculatePriceFromOrder } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-4xl">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>รายละเอียดรายการขนส่ง</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>
        {/* content */}
        <div className="grid grid-cols-2 gap-5">
          {/* Map */}
          <div>
            <Map
              title={
                <Label className="flex justify-center space-y-2 text-xl font-semibold">
                  แผนที่
                </Label>
              }
              isMarker={false}
              value={{ lat: delivery.lat, lng: delivery.lng }}
            />
            <div className="mt-2">
              <Button className="w-full" asChild>
                <a
                  href={`https://www.google.com/maps?q=${delivery.lat},${delivery.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  เปิด Google Map
                </a>
              </Button>
            </div>
          </div>
          {/* End Map */}

          {/* Details */}
          <div className="grid grid-cols-2 gap-2 h-1">
            <h1 className="col-span-full flex justify-center space-y-2 text-xl font-semibold">
              รายละเอียด
            </h1>
            <FormInput
              className="col-span-full"
              label="หมายเลขติดตาม"
              defaultValue={delivery.trackNumber}
              disabled
            />
            <FormTextArea
              className="col-span-full"
              rows={4}
              label="ที่อยู่จัดส่ง"
              defaultValue={delivery.address}
              disabled
            />
            <FormInput
              label="ระยะทาง (กิโลเมตร)"
              defaultValue={delivery.distance.toLocaleString()}
              disabled
            />
            <FormInput
              label="ค่าส่ง (บาท)"
              defaultValue={delivery.fee.toLocaleString()}
              disabled
            />
            <FormInput
              label="สถาณะ"
              defaultValue={deliveryUtils.deliveryStatusFormatter(
                delivery.status
              )}
              disabled
            />
            <FormInput
              label="ประเภท"
              defaultValue={deliveryUtils.deliveryTypeFormatter(
                delivery.type
              )}
              disabled
            />
            <FormInput
              label="วันที่ส่ง"
              defaultValue={dayjsUtils.autoFormat(delivery.sendDate)}
              disabled
            />
            <FormInput
              label="วันที่ส่งสำเร็จ"
              defaultValue={
                delivery.completedAt
                  ? dayjsUtils.autoFormat(delivery.completedAt)
                  : "-- ยังไม่ส่ง --"
              }
              disabled
            />
            <FormInput
              label="ประเภทบิล"
              defaultValue={
                delivery.order.type
                  ? orderUtils.orderTypeFormatter(delivery.order.type)
                  : ""
              }
              disabled
            />
            <FormInput
              label="เงินที่ต้องเก็บ (มัดจำ)"
              defaultValue={
                delivery.order.type === OrderTypeType.DEPOSITED
                  ? calculatePriceFromOrder(delivery)
                  : "-- ไม่มีเก็บ --"
              }
              disabled
            />
            <FormTextArea
              className="col-span-full"
              label="หมายเหตุ"
              rows={4}
              defaultValue={delivery.note}
              disabled
            />
            <hr className="col-span-full my-2" />
            <div className="col-span-full">
              <DeliveryDriverWorkListTable
                deliveryDriver={delivery.DeliveryDriver}
              />
            </div>
          </div>
          {/* End Details */}
        </div>

        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
