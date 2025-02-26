/** @format */

import { ProductUnitType } from "@/configs/enum.config";

export const saleUtils = {
  productNameFormatter: function (product: {
    categoryName?: string | null;
    name?: string | null;
    model?: string | null;
    size?: string | null;
  }) {
    return `${product.categoryName} ${product.name} ${product.size} ${product.model}`;
  },

  productUnitFormatter: function (unit: ProductUnitType) {
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
