import { z } from "zod";

export const UpdateCategoryFormDataSchema = z.object(
    {
        id: z.string().uuid(),
        categoryCode: z.string().min(2, "ชื่อ ต้องมีอย่างน้อย 2 ตัวอักษร"),
        name: z.string().min(2, "ชื่อ ต้องมีอย่างน้อย 2 ตัวอักษร"),
        pathname: z.string().optional()
    }
);

export const RemoveCategoryFormDataSchema = z.object(
    {
        id: z.string().uuid(),
        pathname: z.string().optional()
    }
);

export const AddCategoryFormDataSchema = z.object(
    {
        categoryCode: z.string().min(2, "ชื่อ ต้องมีอย่างน้อย 2 ตัวอักษร"),
        name: z.string().min(2, "ชื่อ ต้องมีอย่างน้อย 2 ตัวอักษร"),
        pathname: z.string().optional()
    }
);