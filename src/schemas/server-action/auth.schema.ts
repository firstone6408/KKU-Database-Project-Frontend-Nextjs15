/** @format */

import { z } from "zod";

export const SignInFormDataSchema = z.object({
  username: z.string().min(2, "กรุณาใส่ username มากกว่า 2 ตัวอักษร"),
  password: z.string(),
});
