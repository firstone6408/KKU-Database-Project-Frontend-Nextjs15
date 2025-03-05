/** @format */

export const saleUtils = {
  orderSaleSearchParamsFormat: function (order: {
    orderCode: string;
    customerId: string;
    orderId: string;
  }) {
    return `/bill/sale?orderId=${order.orderId}&orderCode=${order.orderCode}&customerId=${order.customerId}`;
  },
};
