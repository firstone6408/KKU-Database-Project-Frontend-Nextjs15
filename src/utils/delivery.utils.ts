/** @format */

import { DeliveryStatusType, DeliveryType } from "@/configs/enum.config";

export const deliveryUtils = {
  deliveryTypeFormatter: function (
    deliveryType: DeliveryType,
    lang = "th"
  ) {
    switch (deliveryType) {
      case DeliveryType.EXPRESS:
        return "ด่วน";
      case DeliveryType.STANDARD:
        return "ปกติ";
      default:
        return "-ไม่มี-";
    }
  },
  deliveryStatusFormatter: function (
    deliveryStatus: DeliveryStatusType,
    lang = "th"
  ) {
    switch (deliveryStatus) {
      case DeliveryStatusType.CANCELED:
        return "ยกเลิก";
      case DeliveryStatusType.DELAYED:
        return "การจัดส่งล่าช้า";
      case DeliveryStatusType.DELIVERED:
        return "ส่งถึงลูกค้าแล้ว";
      case DeliveryStatusType.IN_TRANSIT:
        return "อยู่ระหว่างการจัดส่ง";
      case DeliveryStatusType.PENDING:
        return "รอดำเนินการจัดส่ง";
      default:
        return "-ไม่มี-";
    }
  },
};
