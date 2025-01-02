import { templateResponse } from "@/utils/api.utils";
import { object, z } from "zod";


// Schema สำหรับ Category
const CategorySchema = z.object({
    id: z.string().uuid(),
    categoryCode: z.string(),
    name: z.string(),
});

// Schema สำหรับ Product
export const fetchProductsResSchema = templateResponse(
    z.array(
        z.object(
            {
                id: z.string().uuid(),
                productCode: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                image: z.string().nullable(), // หรือ z.string().optional() หาก image เป็นค่า optional
                isDeleted: z.boolean(),
                deletedAt: z.string().datetime().nullable(),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime(),
                categoryId: z.string().uuid(),
                category: CategorySchema,
            }
        )
    )
);

