/** @format */

import {
  OrderStatusType,
  OrderTypeType,
  ProductUnitType,
  StockOutType,
} from "@/configs/enum.config";
import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const OrderSchema = z.object({
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

  customer: z.object({
    id: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    customerCode: z.string(),
    customerGroupId: z.string(),
    customerGroup: z.object({
      id: z.string().uuid(),
      name: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    branchId: z.string(),
    userId: z.string(),
  }),

  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
  }),

  StockOutHistory: z.array(
    z.object({
      createdAt: z.string().datetime(),
      note: z.string().nullable(),
      quantity: z.number(),
      product: z.object({
        category: z.object({
          id: z.string(),
          name: z.string(),
          categoryCode: z.string(),
          createdAt: z.string().datetime(),
          updatedAt: z.string().datetime(),
        }),
        id: z.string(),
        name: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        barcode: z.string(),
        productCode: z.string(),
        model: z.string().nullable(),
        size: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        isDeleted: z.boolean(),
        deletedAt: z.string().datetime().nullable(),
        unit: z.nativeEnum(ProductUnitType),
        categoryId: z.string(),
      }),
      sellPrice: z.number(),
      type: z.nativeEnum(StockOutType),
    })
  ),

  PaymentOrder: z
    .object({
      createdAt: z.string().datetime(),
      orderId: z.string(),
      amountRecevied: z.number().nullable(),
      change: z.number().nullable(),
      deposit: z.number().nullable(),
      slipImage: z.string().nullable(),
      credit: z.number().nullable(),
      discount: z.number().nullable(),
      paymentMethodId: z.string(),
      paymentMethod: z.object({
        id: z.string().uuid(),
        name: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      }),
      paidAt: z.string().datetime().nullable(),
    })
    .nullable(),
});

export const OrdersSchemaResSchema = templateResponse(
  z.array(OrderSchema)
);
