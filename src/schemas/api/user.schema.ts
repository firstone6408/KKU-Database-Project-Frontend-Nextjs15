/** @format */

import { UserRole, UserStatus } from "@/configs/enum.config";
import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

const User = z.object({
  id: z.string().uuid(), // UUID validation
  username: z.string(),
  email: z.string().email(), // Email validation
  name: z.string(),
  profileImage: z.string().nullable(), // nullable string
  phoneNumber: z.string().nullable(), // nullable string
  role: z.nativeEnum(UserRole), // ใช้ `z.nativeEnum` สำหรับ Enum
  status: z.nativeEnum(UserStatus), // ใช้ `z.nativeEnum` สำหรับ Enum
  lastLogin: z.string().datetime().nullable(), // ISO datetime string
  branch: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(), // nullable object
});

export const FetchUsersResSchema = templateResponse(z.array(User));

export const FetchUserResSchema = templateResponse(User.nullable());
