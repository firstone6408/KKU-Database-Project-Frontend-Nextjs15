/** @format */

import { OrderStatus } from "@/configs/enum.config";
import { z } from "zod";

export const CreateOrderFormDataSchema = z.object({
  customerId: z.string().uuid(),
  orderCode: z.string(),
});

export const OrderConfirmFormDataSchema = z.object({
  orderId: z.string().uuid(),
  orderItems: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number(),
      sellPrice: z.number(),
    })
  ),
  orderStatus: z.nativeEnum(OrderStatus),
  amountReceived: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  change: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  deposit: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  credit: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  discount: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  paymentMethodId: z.string().uuid(),
  slipImage: z.instanceof(File).optional(),
  note: z.string().optional(),
});
