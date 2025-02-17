/** @format */

import { AxiosError, AxiosResponse } from "axios";
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

function validateResponseFromServer<T>(
  axiosResponse: AxiosResponse<any>,
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

// --------------------------------------------------------------------------------------------

type WithApiHandlingResType<T> = {
  error: {
    status: "success" | "error";
    errorMessage: string;
  };
  result: T;
};
/**
 * A utility function to handle API requests with optional response validation.
 *
 * @template T - The expected type of the response payload.
 * @param requestFn - A function that performs the API request and returns a Promise.
 * @param config - Optional configuration for the request.
 * @param config.option.validateResponse - A Zod schema to validate the API response.
 *
 * @returns {Promise<WithApiHandlingResType<T>>} - Returns an object containing the result and error information.
 *
 * @example
 * ```typescript
 * import axios from "axios";
 * import { z } from "zod";
 *
 * const fetchCustomersSchema = z.object({
 *   customers: z.array(
 *     z.object({
 *       id: z.string(),
 *       name: z.string(),
 *     })
 *   ),
 * });
 *
 * async function fetchCustomers() {
 *   return await withApiHandling(
 *     () => axios.get("https://example.com/api/customers"),
 *     { option: { validateResponse: fetchCustomersSchema } }
 *   );
 * }
 *
 * async function exampleUsage() {
 *   const { result, error } = await fetchCustomers();
 *   if (error.status === "error") {
 *     console.error("API Error:", error.errorMessage);
 *   } else {
 *     console.log("Customers:", result.customers);
 *   }
 * }
 * ```
 */
export async function withApiHandling<T>(
  requestFn: () => Promise<any>,
  config?: {
    option?: {
      validateResponse?: z.ZodSchema<T>;
    };
  }
): Promise<WithApiHandlingResType<T>> {
  let status: WithApiHandlingResType<T>["error"]["status"] = "success";
  let errorMessage = "No error";
  let result;
  try {
    result = await requestFn();
    if (config) {
      const { option } = config;
      if (option?.validateResponse) {
        result = validateResponseFromServer(
          result,
          option.validateResponse
        );
      }
    }
  } catch (error: any) {
    status = "error";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || "Unknown Axios error";
    } else {
      errorMessage = String(error);
    }
  }

  return { result, error: { status, errorMessage } };
}
