/** @format */

import { urlConfig } from "@/configs/url.config";
import { fetchPaymentMethodsResSchema } from "@/schemas/api/payment-method.schema";
import {
  AddOrUpdatePaymentMethodFormDataSchema,
  RemovePaymentMethodFormDataSchema,
} from "@/schemas/server-action/payment-method.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios, { Axios } from "axios";
import { redirect } from "next/navigation";

export async function fetchPaymentMethods() {
  const user = (await getSession()).user;

  const { error, result } = await withApiHandling(
    async () =>
      axios.get(`${urlConfig.KKU_API_URL}/payment-methods`, {
        headers: buildHeaders({ token: user.token }),
      }),
    { option: { validateResponse: fetchPaymentMethodsResSchema } }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  // console.log(result.payload.data)

  return result.payload.data;
}
export type PaymentMethodType = Awaited<
  ReturnType<typeof fetchPaymentMethods>
>[number];

export async function addOrUpdatePaymentMethodAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/payment-method";
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(
      formData,
      AddOrUpdatePaymentMethodFormDataSchema
    );
    const { pathname, id, name } = data;
    pathname && (_pathname = pathname);

    let _error: string | undefined;

    const payload = {
      name: name,
    };
    let _axios: any;

    if (id !== "") {
      _axios = axios.put(
        `${urlConfig.KKU_API_URL}/payment-methods/${id}`,
        payload,
        { headers: buildHeaders({ token: user.token }) }
      );
    } else {
      _axios = axios.post(
        `${urlConfig.KKU_API_URL}/payment-methods`,
        payload,
        { headers: buildHeaders({ token: user.token }) }
      );
    }

    const { error } = await withApiHandling(async () => _axios);

    if (error.status === "error") {
      return renderFail({ error: error.errorMessage });
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect(_pathname);
}

export async function removePaymentMethodAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/payment-method";
  try {
    const user = (await getSession()).user;

    const { id, pathname } = validateFormDataWithZod(
      formData,
      RemovePaymentMethodFormDataSchema
    );

    pathname && (_pathname = pathname);

    const { error } = await withApiHandling(async () =>
      axios.delete(`${urlConfig.KKU_API_URL}/payment-methods/${id}`, {
        headers: buildHeaders({ token: user.token }),
      })
    );

    if (error.status === "error") {
      throw new Error(error.errorMessage);
    }
  } catch (error) {
    return renderFail({ error });
  }
  redirect(_pathname);
}
