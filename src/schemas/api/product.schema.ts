/** @format */

import { ProductUnit } from "@/configs/enum.config";
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
    z.object({
      id: z.string().uuid(),
      barcode: z.string(),
      productCode: z.string(),
      name: z.string(),
      model: z.string().nullable(),
      size: z.string().nullable(),
      unit: z.nativeEnum(ProductUnit),
      description: z.string().nullable(),
      image: z.string().nullable(), // หรือ z.string().optional() หาก image เป็นค่า optional
      isDeleted: z.boolean(),
      deletedAt: z.string().datetime().nullable(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
      categoryId: z.string().uuid(),
      category: CategorySchema,
    })
  )
);
