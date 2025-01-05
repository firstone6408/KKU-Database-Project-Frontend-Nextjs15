import { z } from "zod";

export const UpdatePriceFormDataSchema = z.object(
    {
        productId: z.string().uuid(),
        sellPrice: z.coerce.number(),
        pathname: z.string().optional()
    }
);