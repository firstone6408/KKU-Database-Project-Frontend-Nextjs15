/** @format */

import { z } from "zod";

export const AddStockInHistoryFormDataSchema = z.object({
  pathname: z.string().optional(),
  productId: z.string().uuid(),
  quantity: z.coerce.number().min(0, "จำนวนต้องมากกว่า 0"),
  refCode: z.string(),
  note: z.string(),
  costPrice: z.coerce.number(),
});

export const FirstAddStockInHistoryFormDataSchema =
  AddStockInHistoryFormDataSchema.extend({ sellPrice: z.coerce.number() });

export const AddStockFormDataSchema = z.object({
  pathname: z.string().optional(),
  refCode: z.string(),
  distributor: z.string(),
  note: z.string(),
  stockInItems: z.array(
    z.object({
      productId: z.string(),
      quantity: z.string().transform((val) => {
        const num = Number(val);
        if (isNaN(num)) {
          return 0;
        }
        return num;
      }),
      costPrice: z.string().transform((val) => {
        const num = Number(val);
        if (isNaN(num)) {
          return 0;
        }
        return num;
      }),
    })
  ),
});

export const CancelStockInHistoryFormDataSchema = z.object({
  stockInHistoryId: z.string().uuid(),
  pathname: z.string().optional(),
  cancelNote: z.string(),
});
