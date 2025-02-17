/** @format */

import { OrderStatus } from "@/configs/enum.config";

export const orderUtils = {
  orderStatusFormatter: function (orderStatus: OrderStatus, lang = "th") {
    switch (orderStatus) {
      case OrderStatus.PENDING:
        return "รอดำเนินการ";
      case OrderStatus.CANCELLED:
        return "ยกเลิกรายการ";
      case OrderStatus.COMPLETED:
        return "สำเร็จ";
      case OrderStatus.CREDIT_USED:
        return "บิลเครดิต";
      case OrderStatus.DEPOSITED:
        return "บิลมัดจำ";
      case OrderStatus.REFUNDED:
        return "คืนของ";
      default:
        break;
    }
  },
};
