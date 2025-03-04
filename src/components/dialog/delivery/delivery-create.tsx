/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Map } from "@/components/map";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import { CustomerType } from "@/server-actions/customer";
import DeliveryTypeDropdown from "@/components/dropdown/delivery";
import FormTextArea from "@/components/form/form-textarea";
import { createDelivery } from "@/server-actions/delivery";
import { useToast } from "@/hooks/use-toast";

type FormDataType = {
  trackNumber?: string;
  distance?: number;
  address?: string;
  type?: string;
  lng?: number;
  lat?: number;
  note?: string;
  sendDate?: string;
  fee?: number;
};

export function DeliveryCreateDialog(props: {
  btn: any;
  order: {
    orderId: string;
    orderCode: string;
  };
  customer: CustomerType;
}) {
  const { btn, order, customer } = props;
  const { orderCode, orderId } = order;
  const [formData, setFormData] = useState<FormDataType>({
    trackNumber: "",
    distance: 0,
    address: "",
    type: "",
    lng: 0,
    lat: 0,
    note: "",
    sendDate: "",
    fee: 0,
  });
  const { toast } = useToast();

  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));

    //console.log(name, value);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      address: customer.address ?? undefined,
      trackNumber: `TKN-${orderCode}_${customer.customerCode}`,
    }));
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      lat: location?.lat ?? 0,
      lng: location?.lng ?? 0,
    }));
  }, [location]);

  useEffect(() => {
    // When lat or lng changes, update the location to reflect the new position
    setLocation({ lat: formData.lat ?? 0, lng: formData.lng ?? 0 });
  }, [formData.lat, formData.lng]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // console.log("OrderId:", orderId);
      //console.log("FormData:", formData);
      const data: any = {
        orderId: orderId,
        options: formData,
      };
      await createDelivery(data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">ขนส่ง</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left */}
          <Map
            title={
              <h1 className="font-semibold text-xl text-center">แผนที่</h1>
            }
            value={location}
            setValue={setLocation}
            isMarker={true}
          />
          {/* End Left */}

          {/* Right */}
          <form
            className="h-1 grid grid-cols-2 gap-2"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1 className="font-semibold text-xl col-span-full text-center">
              รายละเอียดการส่ง
            </h1>
            <FormInput
              className="col-span-full"
              label="หมายเลขติดตาม"
              value={formData.trackNumber}
              onChange={handleChange}
              name="trackNumber"
              disabled
              required
            />
            <FormTextArea
              className="col-span-full"
              rows={4}
              label="ที่อยู่จัดส่ง"
              value={formData.address}
              onChange={handleChange}
              name="address"
              required
            />
            <FormInput
              className="col-span-1"
              label="ละติจูด (latitude)"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
            />
            <FormInput
              className="col-span-1"
              label="ลองจิจูด (longitude)"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              required
            />
            <DeliveryTypeDropdown
              className="col-span-1 space-y-2"
              label="ประเภทการขนส่ง"
              name="type"
              setOnChangeForm={setFormData}
              required
            />
            <FormInput
              label="วันที่จัดส่ง"
              type="datetime-local"
              name="sendDate"
              value={formData.sendDate}
              onChange={handleChange}
              required
            />
            <FormInput
              label="ระยะทางจัดส่ง (กิโลเมตร)"
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              required
            />
            <FormInput
              className="col-span-1"
              label="ค่าส่ง (บาท)"
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
            />
            <FormTextArea
              className="col-span-full"
              label="หมายเหตุ"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={4}
            />
            <Button className="col-span-full" type="submit">
              บันทึก
            </Button>
          </form>
          {/* End Right */}
        </div>

        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
