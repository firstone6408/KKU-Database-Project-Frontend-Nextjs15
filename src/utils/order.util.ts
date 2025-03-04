/** @format */

import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";

export const orderUtils = {
  orderTypeFormatter: function (
    orderType: OrderTypeType | null,
    lang = "th"
  ) {
    switch (orderType) {
      case OrderTypeType.FULL_PAYMENT:
        return "บิลจ่ายปกติ";
      case OrderTypeType.CREDIT_USED:
        return "บิลเครดิต";
      case OrderTypeType.DEPOSITED:
        return "บิลมัดจำ";
      case OrderTypeType.DEPOSITED_CREDIT_USED:
        return "บิลมัดจำกับเครดิต";
      default:
        return "-- ไม่มี --";
    }
  },

  orderStatusFormatter: function (
    orderStatus: OrderStatusType,
    lang = "th"
  ) {
    switch (orderStatus) {
      case OrderStatusType.REFUNDED:
        return "คืนของ";
      case OrderStatusType.COMPLETED:
        return "สำเร็จ";
      case OrderStatusType.PENDING:
        return "รอดำเนินการ";
      case OrderStatusType.CANCELLED:
        return "ยกเลิกรายการ";
      case OrderStatusType.DELIVERING:
        return "กำลังขนส่ง";
      case OrderStatusType.UNPAID:
        return "ค้างชำระ";
      default:
        return "-- ไม่มี --";
    }
  },
};
