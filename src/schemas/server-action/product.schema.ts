import { z } from "zod";

export const UpdateProductFormDataSchema = z.object(
    {
        id: z.string().uuid(),
        productCode: z.string().min(1, "รหัสสินค้าเป็นสิ่งจำเป็น"),
        name: z.string().min(1, "ชื่อสินค้าเป็นสิ่งจำเป็น"),
        description: z.string().optional(),
        categoryId: z.string().uuid("หมวดหมู่ไม่ถูกต้อง"),
        image: z.instanceof(File).optional(),
        isDeleted: z.preprocess(
            (val) => (val === "true" ? true : val === "false" ? false : val),
            z.boolean().default(false)
        ),
        pathname: z.string().optional()
    }
);

export const AddProductFormDataSchema = z.object(
    {
        productCode: z.string().min(1, "รหัสสินค้าเป็นสิ่งจำเป็น"),
        name: z.string().min(1, "ชื่อสินค้าเป็นสิ่งจำเป็น"),
        description: z.string().optional(),
        categoryId: z.string().uuid("หมวดหมู่ไม่ถูกต้อง"),
        image: z.instanceof(File).optional(),
        pathname: z.string().optional()
    }
);