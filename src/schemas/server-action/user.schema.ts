/** @format */

import { UserRole, UserStatus } from "@/configs/enum.config";
import { z } from "zod";

export const AddUserFormDataSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  profileImage: z.instanceof(File).optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "เบอร์โทรต้องมีความยาวมากกว่า 10 ตัว",
    }),
  role: z.nativeEnum(UserRole),
});

export const UpdateUserFormDataSchema = z.object({
  pathname: z.string().optional(),
  userId: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  name: z.string(),
  profileImage: z.instanceof(File).optional(),
  phoneNumber: z.string().refine((val) => !val || val.length >= 10, {
    message: "เบอร์โทรต้องมีความยาวมากกว่า 10 ตัว",
  }),
  status: z.nativeEnum(UserStatus).optional(),
  role: z.nativeEnum(UserRole).optional(),
});
