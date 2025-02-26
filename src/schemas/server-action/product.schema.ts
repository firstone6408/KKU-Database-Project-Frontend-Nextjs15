/** @format */

import { ProductUnitType } from "@/configs/enum.config";
import { z } from "zod";

export const UpdateProductFormDataSchema = z.object({
  id: z.string().uuid(),
  barcode: z.string().min(1, "บาร์โค้ดเป็นสิ่งจำเป็น"),
  productCode: z.string().min(1, "รหัสสินค้าเป็นสิ่งจำเป็น"),
  name: z.string().min(1, "ชื่อสินค้าเป็นสิ่งจำเป็น"),
  model: z.string().optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid("หมวดหมู่ไม่ถูกต้อง"),
  image: z.instanceof(File).optional(),
  unit: z.nativeEnum(ProductUnitType),
  isDeleted: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    z.boolean().default(false)
  ),
  pathname: z.string().optional(),
});

export const AddProductFormDataSchema = z.object({
  barcode: z.string().min(1, "บาร์โค้ดเป็นสิ่งจำเป็น"),
  productCode: z.string().min(1, "รหัสสินค้าเป็นสิ่งจำเป็น"),
  model: z.string().optional(),
  size: z.string().optional(),
  name: z.string().min(1, "ชื่อสินค้าเป็นสิ่งจำเป็น"),
  description: z.string().optional(),
  categoryId: z.string().uuid("หมวดหมู่ไม่ถูกต้อง"),
  image: z.instanceof(File).optional(),
  unit: z.nativeEnum(ProductUnitType),
  pathname: z.string().optional(),
});
