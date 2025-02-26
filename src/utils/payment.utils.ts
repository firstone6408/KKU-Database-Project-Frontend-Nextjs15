/** @format */

import { PaymentType } from "@/configs/enum.config";

export const paymentUtils = {
  paymentTypeFormatter: function (paymentType: PaymentType) {
    switch (paymentType) {
      case PaymentType.CREDIT:
        return "จ่ายแบบเครดิต";
      case PaymentType.DEPOSIT:
        return "จ่ายแบบมัดจำ";
      case PaymentType.FULL:
        return "จ่ายปกติ";
      default:
        return "paymentType error";
    }
  },
};
