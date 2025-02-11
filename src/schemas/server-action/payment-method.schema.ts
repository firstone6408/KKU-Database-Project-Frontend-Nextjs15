import { z } from "zod";

export const AddOrUpdatePaymentMethodFormDataSchema = z.object(
    {
        id: z.string(),
        name: z.string(),
        pathname: z.string().optional()
    }
);

export const RemovePaymentMethodFormDataSchema = z.object(
    {
        id: z.string(),
        pathname: z.string().optional()
    }
);