/** @format */

import { OrderTypeType } from "@/configs/enum.config";
import { z } from "zod";

export const CreateOrderFormDataSchema = z.object({
  customerId: z.string().uuid(),
  orderCode: z.string(),
});

export const RemoveOrderFormDataSchema = z.object({
  _pathname: z.string().optional(),
  orderId: z.string().uuid(),
});

export const OrderConfirmFormDataSchema = z.object({
  orderId: z.string().uuid(),
  orderItems: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number(),
        sellPrice: z.number(),
        length: z.number().optional(),
      })
    )
    .refine((items) => items.length > 0, {
      message: "ต้องมีรายการสินค้าอย่างน้อย 1 รายการ",
    }),
  orderType: z.nativeEnum(OrderTypeType),
  amountRecevied: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  change: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  deposit: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? undefined : Number(val)))
    .optional()
    .refine(
      (val) => {
        // ตรวจสอบว่าเครดิตต้องมากกว่า 0 ถ้าค่ามี
        return val === undefined || val > 0;
      },
      {
        message: "ต้องมีมัดจำอย่างน้อย 1 บาท",
      }
    ),
  credit: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? undefined : Number(val)))
    .optional()
    .refine(
      (val) => {
        // ตรวจสอบว่าเครดิตต้องมากกว่า 0 ถ้าค่ามี
        return val === undefined || val > 0;
      },
      {
        message: "เครดิตต้องมากกว่า 0 วัน",
      }
    ),
  discount: z
    .string()
    .transform((val) => (isNaN(Number(val)) ? 0 : Number(val)))
    .optional(),
  paymentMethodId: z.string().uuid(),
  slipImage: z.instanceof(File).optional(),
  note: z.string().optional(),
});

export const PayReportFormDataSchema = z.object({
  pathname: z.string().optional(),
  orderId: z.string().uuid(),
  slipImage: z.instanceof(File),
});
