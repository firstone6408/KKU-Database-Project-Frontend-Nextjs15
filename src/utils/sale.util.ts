/** @format */

import { ProductUnit } from "@/configs/enum.config";

export const saleUtils = {
  productNameFormatter: function (
    name: string,
    model: string,
    size: string
  ) {
    return `${name} ${size} ${model}`;
  },

  productUnitFormatter: function (unit: ProductUnit) {
    switch (unit) {
      case "METER":
        return "เมตร";
      case "PIECE":
        return "ชิ้น";
      default:
        return "";
    }
  },

  orderSaleSearchParamsFormat: function (order: {
    orderCode: string;
    customerId: string;
    orderId: string;
  }) {
    return `/bill/sale?orderId=${order.orderId}&orderCode=${order.orderCode}&customerId=${order.customerId}`;
  },
};
