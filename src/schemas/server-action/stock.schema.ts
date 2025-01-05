import { z } from "zod";

export const AddStockInHistoryFormDataSchema = z.object(
    {
        pathname: z.string().optional(),
        productId: z.string().uuid(),
        quantity: z.coerce.number().min(0, "จำนวนต้องมากกว่า 0"),
        refCode: z.string(),
        note: z.string(),
        costPrice: z.coerce.number()
    }
);

export const FirstAddStockInHistoryFormDataSchema = AddStockInHistoryFormDataSchema.extend(
    { sellPrice: z.coerce.number() }
);