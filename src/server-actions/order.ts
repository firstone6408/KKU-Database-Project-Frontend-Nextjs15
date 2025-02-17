/** @format */

import { urlConfig } from "@/configs/url.config";
import { OrdersSchemaResSchema } from "@/schemas/api/order";
import {
  CreateOrderFormDataSchema,
  OrderConfirmFormDataSchema,
} from "@/schemas/server-action/order.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import {
  renderFail,
  renderSuccess,
} from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import {
  validateError,
  validateFormDataWithZod,
} from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchOrderByUser() {
  const user = (await getSession()).user;

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(`${urlConfig.KKU_API_URL}/orders/user/${user.id}`, {
        headers: buildHeaders({ token: user.token }),
      }),
    {
      option: {
        validateResponse: OrdersSchemaResSchema,
      },
    }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

export type OrderType = Awaited<
  ReturnType<typeof fetchOrderByUser>
>[number];

export async function createOrderAction(
  prevState: any,
  formData: FormData
) {
  try {
    const user = (await getSession()).user;

    const validated = validateFormDataWithZod(
      formData,
      CreateOrderFormDataSchema
    );

    const payload = {
      customerId: validated.customerId,
      branchId: user.branchId,
      orderCode: validated.orderCode,
    };

    //  console.log("payload:", payload);

    const { error } = await withApiHandling(async () =>
      axios.post(`${urlConfig.KKU_API_URL}/orders/create`, payload, {
        headers: buildHeaders({ token: user.token }),
      })
    );

    if (error.status === "error") {
      throw new Error(error.errorMessage);
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/bill");
}

export async function orderConfirmAction(
  prevState: any,
  formData: FormData
) {
  try {
    const user = (await getSession()).user;

    const objEntry = Object.fromEntries(formData) as any;
    const jsonParseOrderItems = JSON.parse(objEntry.orderItems);
    const { orderItems, ...form } = objEntry;
    form.orderItems = jsonParseOrderItems;

    const validated = OrderConfirmFormDataSchema.safeParse(form);

    if (!validated.success || !validated.data) {
      validateError(validated.error);
      throw new Error("");
    }

    const data = validated.data;

    console.log("data:", data);

    // const { error } = await withApiHandling(async () =>
    //   axios.post(`${urlConfig.KKU_API_URL}/orders/create`, payload, {
    //     headers: buildHeaders({ token: user.token }),
    //   })
    // );

    // if (error.status === "error") {
    //   throw new Error(error.errorMessage);
    // }
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/bill");
}
