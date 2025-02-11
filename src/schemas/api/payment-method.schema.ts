import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const fetchPaymentMethodsResSchema = templateResponse(
    z.array(z.object(
        {
            id: z.string().uuid(),
            name: z.string(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
        }
    ))
);