/** @format */

import { AxiosResponse } from "axios";
import { z } from "zod";

export function validateFormDataWithZod<T>(
  formData: FormData,
  zodSchema: z.ZodSchema<T>
) {
  const rawData = Object.fromEntries(formData);
  //console.log(rawData);
  const validatedResult = zodSchema.safeParse(rawData);
  if (!validatedResult.success) {
    const errorMessage = validatedResult.error.errors.map(
      (err) => err.message
    );
    console.log(errorMessage);
    throw new Error(errorMessage.join(", "));
  }
  return validatedResult.data;
}

export function validateResponseFromServer<T>(
  axiosResponse: AxiosResponse,
  responseSchema: z.ZodSchema<T>
) {
  const validatedResult = responseSchema.safeParse(axiosResponse.data);
  if (!validatedResult.success) {
    const errorMessage = validatedResult.error.errors.map(
      (err) => `[${err.path}: ${err.message}]`
    );
    console.log(errorMessage);
    throw new Error(errorMessage.join(", "));
  }

  return validatedResult.data;
}
