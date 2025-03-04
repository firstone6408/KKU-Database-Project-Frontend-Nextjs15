/** @format */

import { z } from "zod";

export const UpdateCustomerFormDataSchema = z.object({
  id: z.string().uuid(),
  customerGroupId: z.string().uuid(),
  name: z.string().min(3, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }),
  phoneNumber: z.string().nullable(),
  address: z.string().nullable(),
  pathname: z.string().optional(),
});

export const AddCustomerFormDataSchema = z.object({
  customerCode: z.string().min(2, "รหัสลูกค้าต้องมีมากกว่า 2 ตัวอักษร"),
  customerGroupId: z.string().uuid(),
  name: z.string().min(1, "รหัสลูกค้าต้องมีมากกว่า 1 ตัวอักษร"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,}$/, "เบอร์ต้องเป็นตัวเลขและมีอย่างน้อย 10 หลัก"),
  address: z.string().optional(),
});

export const CreateOrUpdateCustomerGroupFormDataSchema = z.object({
  pathname: z.string().optional(),
  id: z.string().uuid().optional(),
  name: z.string(),
});
