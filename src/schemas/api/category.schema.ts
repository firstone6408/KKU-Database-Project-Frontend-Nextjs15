import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const fetchCategoriesResSchema = templateResponse(
    z.array(
        z.object(
            {
                id: z.string().uuid(),
                categoryCode: z.string(),
                name: z.string(),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime()
            }
        )
    )
);