/** @format */

"use server";

import { ReportPageSearchParams } from "@/app/(root)/report/page";
import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";
import { urlConfig } from "@/configs/url.config";
import {
  OrderSchemaResSchema,
  OrdersSchemaResSchema,
} from "@/schemas/api/order";
import {
  CreateOrderFormDataSchema,
  OrderConfirmFormDataSchema,
  PayReportFormDataSchema,
  RemoveOrderFormDataSchema,
} from "@/schemas/server-action/order.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { paramUtils } from "@/utils/params.utils";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import {
  validateError,
  validateFormDataWithZod,
} from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchOrderByBranchIdAndUserId(options?: {
  status: OrderStatusType;
}) {
  const user = (await getSession()).user;

  let urlApi: string = `${urlConfig.KKU_API_URL}/orders/branch/${user.branchId}/user/${user.id}`;

  if (options) {
    if (options.status) {
      urlApi += "/pending";
    }
  }

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(urlApi, {
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
  ReturnType<typeof fetchOrderByBranchIdAndUserId>
>[number];

export async function fetchOrdersByBranchId(data?: {
  searchParams: ReportPageSearchParams;
}) {
  const user = (await getSession()).user;

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/orders/branch/${
          user.branchId
        }${paramUtils.searchParamsFormatToString(
          data?.searchParams || {}
        )}`,
        {
          headers: buildHeaders({ token: user.token }),
        }
      ),
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

export async function fetchOrdersByBranchIdAndOrderId(orderId: string) {
  const user = (await getSession()).user;

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/orders/branch/${user.branchId}/order/${orderId}`,
        {
          headers: buildHeaders({ token: user.token }),
        }
      ),
    {
      option: {
        validateResponse: OrderSchemaResSchema,
      },
    }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

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

export async function removeOrderAction(
  prevState: any,
  formData: FormData
) {
  let pathname: string = "/bill";
  try {
    const user = (await getSession()).user;

    const { _pathname, orderId } = validateFormDataWithZod(
      formData,
      RemoveOrderFormDataSchema
    );

    _pathname && (pathname = _pathname);

    // console.log("orderId:", orderId);

    const { error } = await withApiHandling(async () =>
      axios.delete(`${urlConfig.KKU_API_URL}/orders/${orderId}/cancel`, {
        headers: buildHeaders({ token: user.token }),
      })
    );

    if (error.status === "error") {
      throw new Error(error.errorMessage);
    }
  } catch (error) {
    return renderFail({ error });
  }
  redirect(pathname);
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

    // console.log("data:", data);

    const formDataPayload = new FormData();
    formDataPayload.append("orderId", data.orderId);
    formDataPayload.append("orderItems", JSON.stringify(data.orderItems));
    if (data.note) formDataPayload.append("note", data.note);
    formDataPayload.append("paymentMethodId", data.paymentMethodId);
    if (data.discount)
      formDataPayload.append("discount", String(data.discount));

    if (data.orderType === OrderTypeType.CREDIT_USED && data.credit) {
      formDataPayload.append("orderType", OrderTypeType.CREDIT_USED);
      formDataPayload.append("credit", data.credit.toString());
    } else if (
      data.orderType === OrderTypeType.DEPOSITED &&
      data.deposit
    ) {
      formDataPayload.append("orderType", OrderTypeType.DEPOSITED);
      formDataPayload.append("deposit", data.deposit.toString());
    } else if (
      data.orderType === OrderTypeType.DEPOSITED_CREDIT_USED &&
      data.credit &&
      data.deposit
    ) {
      formDataPayload.append(
        "orderType",
        OrderTypeType.DEPOSITED_CREDIT_USED
      );
      formDataPayload.append("credit", data.credit.toString());
      formDataPayload.append("deposit", data.deposit.toString());
    } else if (
      data.orderType === OrderTypeType.FULL_PAYMENT &&
      data.amountRecevied
    ) {
      formDataPayload.append("orderType", OrderTypeType.FULL_PAYMENT);
      formDataPayload.append(
        "amountRecevied",
        data.amountRecevied.toString()
      );
      if (data.change)
        formDataPayload.append("change", data.change.toString());
    } else {
      throw new Error("เกิดข้อผิดพลาดบางอย่าง");
    }

    if (data.slipImage && data.slipImage.size > 0) {
      formDataPayload.append("slipImage", data.slipImage);
    }

    const { error } = await withApiHandling(async () =>
      axios.put(
        `${urlConfig.KKU_API_URL}/orders/confirm`,
        formDataPayload,
        {
          headers: buildHeaders({
            token: user.token,
            uploadHeaders: true,
          }),
        }
      )
    );

    if (error.status === "error") {
      console.log(error);
      throw new Error(error.errorMessage);
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/bill");
}

export async function payOrderAction(prevState: any, formData: FormData) {
  let _pathname = "/report";
  try {
    const validated = validateFormDataWithZod(
      formData,
      PayReportFormDataSchema
    );

    validated.pathname && (_pathname = validated.pathname);

    const payloadFormData = new FormData();
    payloadFormData.append("orderId", validated.orderId);
    payloadFormData.append("slipImage", validated.slipImage);

    if (validated.slipImage.size <= 0) {
      throw new Error("กรุณาใส่ภาพ");
    }

    const user = (await getSession()).user;

    const { error } = await withApiHandling(async () =>
      axios.put(`${urlConfig.KKU_API_URL}/orders/pay`, payloadFormData, {
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
