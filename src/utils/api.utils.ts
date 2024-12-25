/** @format */

import { z } from "zod";

export function templateResponse<T>(zodSchema: z.ZodSchema<T>) {
  return z.object({
    ok: z.boolean(),
    message: z.string(),
    payload: z.object({
      data: zodSchema,
    }),
  });
}
