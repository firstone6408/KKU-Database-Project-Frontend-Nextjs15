/** @format */

import useOrderStore, { IdentityOrderType } from "@/stores/order.store";

export const storeUtils = {
  ownerFormatter: function (userId: string) {
    return `ORDER-USER-${userId}`;
  },
  getUserListByOwner: function (identity: IdentityOrderType) {
    const { orderId, userId } = identity;
    const orderList = useOrderStore((state) => state.orderList);

    const owner = this.ownerFormatter(userId);
    const orderListByOwner = orderList.find(
      (order) => order.owner === owner
    );

    if (!orderListByOwner) return undefined;

    const data = orderListByOwner.data.find(
      (order) => order.orderId === orderId
    );
    return data;
  },
};
