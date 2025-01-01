/** @format */

import { UserRole, UserStatus } from "@/configs/enum.config";
import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const LoginResSchema = templateResponse(
  z.object({
    token: z.string(),
    user: z.object({
      name: z.string(),
      id: z.string(),
      email: z.string().email(), // เพิ่มการตรวจสอบว่าเป็นอีเมลที่ถูกต้อง
      profileImage: z.string().nullable(), // กรณีที่ `profileImage` สามารถเป็น `null`
      role: z.nativeEnum(UserRole), // ใช้ `z.nativeEnum` สำหรับ Enum
      status: z.nativeEnum(UserStatus), // ใช้ `z.nativeEnum` สำหรับ Enum
      branchId: z.string().nullable(), // กรณีที่ `branchId` สามารถเป็น `null`
    }),
  })
);
