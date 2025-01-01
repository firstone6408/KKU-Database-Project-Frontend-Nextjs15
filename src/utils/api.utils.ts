/** @format */

import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export function templateResponse<T>(zodSchema: z.ZodSchema<T>)
{
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
)
{
  const validatedResult = responseSchema.safeParse(axiosResponse.data);
  if (!validatedResult.success)
  {
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
  result: T
}

export async function withApiHandling<T>(requestFn: () => Promise<any>, config?: {
  option?: {
    validateResponse?: z.ZodSchema<T>
  }
}): Promise<WithApiHandlingResType<T>>
{
  let status: WithApiHandlingResType<T>["error"]["status"] = "success";
  let errorMessage = "No error";
  let result;
  try
  {
    result = await requestFn();
    if (config)
    {
      const { option } = config;
      if (option?.validateResponse)
      {
        result = validateResponseFromServer(result, option.validateResponse);
      }
    }
  } catch (error: any)
  {
    status = "error";
    if (error instanceof AxiosError)
    {
      errorMessage = error.response?.data.message || "Unknown Axios error";
    }
    else
    {
      errorMessage = String(error);
    }
  }

  return { result, error: { status: status, errorMessage: errorMessage } };
}
