/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storeConfig } from "@/configs/store.config";
import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";
import { storeUtils } from "@/utils/store.utils";
import { StockProductType } from "@/server-actions/stock";

export type OrderListType = {
  orderId: string;
  orderItems: {
    product: StockProductType;
    sellPrice: number;
    quantity: number;
    productId: string;
  }[];
  orderStatus: OrderStatusType;
  orderType?: OrderTypeType;
  note?: string;
  paymentMethodId?: string;
  amountRecevied?: number;
  change?: number;
  slipImage?: File;
  credit?: number;
  deposit?: number;
  discount?: number;
};

export type IdentityOrderType = {
  userId: string;
  orderId: string;
};

type orderState = {
  orderList: {
    owner: string;
    data: OrderListType[];
  }[];
  createOrderIfNotExist: (identity: IdentityOrderType) => void;
  addOrderItemsByOrderId: (
    identity: IdentityOrderType,
    orderItem: OrderListType["orderItems"][number]
  ) => void;
  getOrderListByOrderId: (
    identity: IdentityOrderType
  ) => OrderListType | undefined;
  removeOrderItemByProductId: (
    identity: IdentityOrderType,
    productId: string
  ) => void;
  updateOrderListDetailsByOrderId: (
    identity: IdentityOrderType,
    data: Omit<OrderListType, "orderId" | "orderItems" | "orderStatus">
  ) => void;

  updateSomeByOrderId: (
    identity: IdentityOrderType,
    data: Partial<
      Omit<OrderListType, "orderId" | "orderItems" | "orderStatus">
    >
  ) => void;
};

const orderStore = (
  set: (partial: Partial<orderState>) => void,
  get: () => orderState
): orderState => ({
  orderList: [],

  createOrderIfNotExist(identity) {
    const { userId, orderId } = identity;
    const owner = storeUtils.ownerFormatter(userId);
    const orderList = get().orderList;

    const orderListByOwner = orderList.find(
      (order) => order.owner === owner
    );

    if (!orderListByOwner) {
      const newOrderList = {
        owner,
        data: [
          {
            orderId,
            orderStatus: OrderStatusType.PENDING,
            orderItems: [],
          },
        ],
      };
      set({ orderList: [...orderList, newOrderList] });
      return;
    }

    // ถ้ามี orderList สำหรับเจ้าของนั้น, เช็คว่า orderId นั้นมีอยู่แล้วหรือไม่
    const isOrderExist = orderListByOwner.data.some(
      (order) => order.orderId === orderId
    );

    if (!isOrderExist) {
      // ถ้าไม่มี, เพิ่ม order ใหม่เข้าไป
      orderListByOwner.data.push({
        orderId,
        orderStatus: OrderStatusType.PENDING,
        orderItems: [],
      });

      // อัปเดต order list ใหม่
      set({ orderList: [...orderList] });
    }
  },

  addOrderItemsByOrderId(identity, orderItem) {
    const { orderId, userId } = identity;
    const owner = storeUtils.ownerFormatter(userId);
    const orderList = get().orderList;

    const orderListByOwnerIndex = orderList.findIndex(
      (item) => item.owner === owner
    );

    if (orderListByOwnerIndex === -1) {
      console.warn(`Owner ${owner} not found.`);
      return;
    }

    const data = [...orderList[orderListByOwnerIndex].data]; // คัดลอก data
    const orderIndex = data.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      console.warn(`Order ID ${orderId} not found.`);
      return;
    }

    const order = data[orderIndex];

    // ค้นหาว่ามี productId นี้อยู่แล้วหรือไม่
    const existingItemIndex = order.orderItems.findIndex(
      (item) => item.productId === orderItem.productId
    );

    if (existingItemIndex !== -1) {
      // ถ้ามีอยู่แล้ว → อัปเดตจำนวนสินค้า (quantity) และราคา
      order.orderItems[existingItemIndex].quantity = orderItem.quantity;
      order.orderItems[existingItemIndex].sellPrice = orderItem.sellPrice;
    } else {
      // ถ้ายังไม่มี → เพิ่มสินค้าเข้าไป
      order.orderItems.push(orderItem);
    }

    const updatedOrderList = [...orderList];
    updatedOrderList[orderListByOwnerIndex] = {
      owner,
      data, // อัปเดต data
    };

    set({ orderList: updatedOrderList });
  },

  removeOrderItemByProductId(identity, productId) {
    const { userId, orderId } = identity;
    const owner = storeUtils.ownerFormatter(userId);
    const orderList = get().orderList;

    // ค้นหาเจ้าของ orderList
    const orderListByOwnerIndex = orderList.findIndex(
      (order) => order.owner === owner
    );

    if (orderListByOwnerIndex === -1) {
      console.warn(`Owner ${owner} not found.`);
      return;
    }

    // คัดลอกข้อมูลเพื่อลดผลกระทบของการแก้ไขโดยตรง
    const data = [...orderList[orderListByOwnerIndex].data];

    // ค้นหา order ตาม orderId
    const orderIndex = data.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      console.warn(`Order ID ${orderId} not found.`);
      return;
    }

    // คัดลอกรายการสินค้าและลบสินค้าตาม productId
    const updatedOrderItems = data[orderIndex].orderItems.filter(
      (item) => item.productId !== productId
    );

    // อัปเดต orderItems ของ order ที่เลือก
    data[orderIndex] = {
      ...data[orderIndex],
      orderItems: updatedOrderItems,
    };

    // อัปเดต orderList ใหม่
    const updatedOrderList = [...orderList];
    updatedOrderList[orderListByOwnerIndex] = {
      ...orderList[orderListByOwnerIndex],
      data,
    };

    // ใช้ set เพื่ออัปเดตค่าใน store
    set({ orderList: updatedOrderList });
  },

  getOrderListByOrderId(identity) {
    const { userId, orderId } = identity;
    const orderList = get().orderList;
    const owner = storeUtils.ownerFormatter(userId);

    const orderListByOwner = orderList.find(
      (order) => order.owner === owner
    );

    if (!orderListByOwner) return undefined;

    const data = orderListByOwner.data.find(
      (order) => order.orderId === orderId
    );
    return data;
  },

  updateOrderListDetailsByOrderId(identity, data) {
    const { userId, orderId } = identity;
    const owner = storeUtils.ownerFormatter(userId); // หาชื่อเจ้าของรายการจาก userId
    const orderList = get().orderList;

    //console.log(data);

    // หา index ของ order ที่ตรงกับ orderId และ owner
    const orderListByOwnerIndex = orderList.findIndex(
      (order) => order.owner === owner
    );

    if (orderListByOwnerIndex !== -1) {
      const orderIndex = orderList[orderListByOwnerIndex].data.findIndex(
        (order) => order.orderId === orderId
      );

      if (orderIndex !== -1) {
        const updatedOrder = {
          ...orderList[orderListByOwnerIndex].data[orderIndex],
        };

        // อัปเดตข้อมูลใน order
        updatedOrder.note = data.note ?? updatedOrder.note;
        updatedOrder.paymentMethodId =
          data.paymentMethodId ?? updatedOrder.paymentMethodId;
        updatedOrder.amountRecevied =
          data.amountRecevied ?? updatedOrder.amountRecevied;
        updatedOrder.change = data.change ?? updatedOrder.change;
        updatedOrder.slipImage = data.slipImage ?? updatedOrder.slipImage;
        updatedOrder.credit = data.credit ?? updatedOrder.credit;
        updatedOrder.deposit = data.deposit ?? updatedOrder.deposit;
        updatedOrder.discount = data.discount ?? updatedOrder.discount;
        updatedOrder.orderType = data.orderType ?? updatedOrder.orderType;

        // อัปเดต orderList ใน state
        orderList[orderListByOwnerIndex].data[orderIndex] = updatedOrder;

        // ใช้ set เพื่อตั้งค่าใหม่
        set({ orderList });
      }
    }
  },

  updateSomeByOrderId(
    identity,
    data: Partial<
      Omit<OrderListType, "orderId" | "orderItems" | "orderStatus">
    >
  ) {
    const { userId, orderId } = identity;
    const owner = storeUtils.ownerFormatter(userId);
    const orderList = get().orderList;

    const orderListByOwnerIndex = orderList.findIndex(
      (order) => order.owner === owner
    );

    if (orderListByOwnerIndex === -1) {
      console.warn(`Owner ${owner} not found.`);
      return;
    }

    const dataCopy = [...orderList[orderListByOwnerIndex].data];
    const orderIndex = dataCopy.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      console.warn(`Order ID ${orderId} not found.`);
      return;
    }

    // ใช้ Object.assign() และกรองค่าที่เป็น undefined
    Object.assign(
      dataCopy[orderIndex],
      Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      )
    );

    const updatedOrderList = [...orderList];
    updatedOrderList[orderListByOwnerIndex] = {
      ...orderList[orderListByOwnerIndex],
      data: dataCopy,
    };

    set({ orderList: updatedOrderList });
  },
});

const usePersist = {
  name: storeConfig.ORDER_LIST,
  storage: createJSONStorage(() => localStorage),
};

const useOrderStore = create(persist(orderStore, usePersist));

export default useOrderStore;
