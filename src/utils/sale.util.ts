/** @format */

import { ProductUnitType } from "@/configs/enum.config";

export const saleUtils = {
  orderSaleSearchParamsFormat: function (order: {
    orderCode: string;
    customerId: string;
    orderId: string;
  }) {
    return `/bill/sale?orderId=${order.orderId}&orderCode=${order.orderCode}&customerId=${order.customerId}`;
  },

  calculatePriceOrder: function (data: {
    sellPrice: number;
    quantity: number;
    length?: number | null;
    unit: ProductUnitType;
  }) {
    const { sellPrice, quantity, unit, length } = data;
    switch (unit) {
      case ProductUnitType.METER:
        return sellPrice * (quantity * (length ?? 0));
      case ProductUnitType.PIECE:
        return sellPrice * quantity;
      default:
        return 0;
    }
  },
};
