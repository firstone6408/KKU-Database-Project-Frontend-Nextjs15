/** @format */

import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

const CustomerGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
});

const CustomerSchema = z.object({
  id: z.string().uuid(),
  customerCode: z.string(),
  name: z.string(),
  phoneNumber: z.string().optional().nullable(), // รองรับ null หรือไม่ใส่ค่า
  address: z.string().optional().nullable(),
  createdAt: z.string().datetime(), // ใช้ ISO 8601 format
  updatedAt: z.string().datetime(),
  customerGroupId: z.string().uuid(),
  branchId: z.string().uuid(),
  userId: z.string().uuid(),
  customerGroup: CustomerGroupSchema.optional().nullable(), // ฝัง schema
  user: UserSchema.optional().nullable(), // ฝัง schema
});

export const fetchCustomerResSchema = templateResponse(CustomerSchema);

export const fetchCustomersResSchema = templateResponse(
  z.array(CustomerSchema)
);

export const fetchCustomerGroupsResSchema = templateResponse(
  z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    })
  )
);
