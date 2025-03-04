/** @format */

import {
  DeliveryStatusType,
  DeliveryType,
  OrderStatusType,
  OrderTypeType,
} from "@/configs/enum.config";
import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

const DeliveriesDriver = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string(),
});

export const DeliveriesDriverResSchame = templateResponse(
  z.array(DeliveriesDriver)
);

const PaymentOrder = z.object({
  createdAt: z.string().datetime(),
  orderId: z.string(),
  amountRecevied: z.number().nullable(),
  change: z.number().nullable(),
  deposit: z.number().nullable(),
  credit: z.number().nullable(),
  discount: z.number().nullable(),
  paymentMethodId: z.string(),
  paidAt: z.string().datetime().nullable(),
  // PaymentOrderSlip: z.array(
  //   z.object({
  //     id: z.string().uuid(),
  //     imageUrl: z.string(),
  //     paymentOrderId: z.string().uuid(),
  //     createdAt: z.string().datetime(),
  //   })
  // ),
});

const Order = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  branchId: z.string(),
  userId: z.string(),
  orderCode: z.string(),
  totalPrice: z.number().nullable(),
  status: z.nativeEnum(OrderStatusType),
  type: z.nativeEnum(OrderTypeType).nullable(),
  note: z.string().nullable(),
  customerId: z.string(),
  PaymentOrder: PaymentOrder.nullable(),
});

export const DeliveriesResSchema = templateResponse(
  z.array(
    z.object({
      address: z.string(),
      completedAt: z.string().datetime().nullable(),
      distance: z.number(),
      fee: z.number(),
      lat: z.number(),
      lng: z.number(),
      note: z.string().nullable(),
      orderId: z.string(),
      sendDate: z.string().datetime(),
      status: z.nativeEnum(DeliveryStatusType),
      trackNumber: z.string(),
      type: z.nativeEnum(DeliveryType),
      updatedAt: z.string(),
      DeliveryDriver: z.array(
        z.object({
          assignedAt: z.string().datetime(),
          deliveryId: z.string().uuid(),
          user: DeliveriesDriver,
        })
      ),
      order: Order,
    })
  )
);
