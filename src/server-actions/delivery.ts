/** @format */

"use server";

import { urlConfig } from "@/configs/url.config";
import {
  DeliveriesDriverResSchame,
  DeliveriesResSchema,
} from "@/schemas/api/delivery.schema";
import {
  AddDeliveryFormData,
  CreateDeliveryFormData,
  CreateDeliveryFormDataType,
  DeliveryDoneFormDataSchema,
} from "@/schemas/server-action/delivery.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import {
  validateError,
  validateFormDataWithZod,
} from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function createDelivery(value: CreateDeliveryFormDataType) {
  const {
    data: payload,
    success,
    error: validateEr,
  } = CreateDeliveryFormData.safeParse(value);
  if (!success) {
    validateError(validateEr);
  }

  const user = (await getSession()).user;

  // console.log("Payload:", payload);

  const { error } = await withApiHandling(async () =>
    axios.post(`${urlConfig.KKU_API_URL}/deliveries`, payload, {
      headers: buildHeaders({ token: user.token }),
    })
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }
}

export async function fetchDeliveries() {
  const user = (await getSession()).user;

  // console.log(user.branchId);

  const { error, result } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/deliveries/branch/${user.branchId}`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    {
      option: {
        validateResponse: DeliveriesResSchema,
      },
    }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

export type DeliveryType = Awaited<
  ReturnType<typeof fetchDeliveries>
>[number];

// Driver ที่ว่าง
export async function fetchDriversAvailable() {
  const user = (await getSession()).user;

  const { error, result } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/deliveries/branch/${user.branchId}/drivers/available`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    {
      option: {
        validateResponse: DeliveriesDriverResSchame,
      },
    }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

export type DeliveryDriverType = Awaited<
  ReturnType<typeof fetchDriversAvailable>
>[number];

export async function addDeliveryDriversAction(
  prevState: null,
  formData: FormData
) {
  let _pathname = "/delivery";
  try {
    const formD = Object.fromEntries(formData);
    const { driversAvailable, ...formD2 } = formD;
    const {
      data,
      error: er,
      success,
    } = AddDeliveryFormData.safeParse({
      orderId: formD2.orderId,
      userIds: JSON.parse(driversAvailable as any),
    });

    if (!success) {
      validateError(er);
    }

    if (data && data.userIds.length <= 0) {
      throw new Error("กรุณาเลือกคนขนส่งอย่างน้อย 1 คน");
    }

    if (!data) {
      throw new Error("เกิดข้อผิดพลาด");
    }

    const user = (await getSession()).user;

    const { pathname, ...payload } = data;
    pathname && (_pathname = pathname);

    //    console.log("Payload:", payload)

    const { error } = await withApiHandling(async () =>
      axios.post(`${urlConfig.KKU_API_URL}/deliveries/drivers`, payload, {
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

export async function deliveryDoneAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/delivery";
  try {
    const validated = validateFormDataWithZod(
      formData,
      DeliveryDoneFormDataSchema
    );

    if (
      validated &&
      validated.slipImage &&
      validated.slipImage.size <= 0
    ) {
      throw new Error("กรุณาใส่รูปหลักฐานการชำระเงิน");
    }

    const user = (await getSession()).user;

    const { pathname, orderId, slipImage } = validated;

    pathname && (_pathname = pathname);

    const payload = new FormData();
    payload.append("orderId", orderId);

    if (slipImage) {
      payload.append("slipImage", slipImage);
    }

    const { error } = await withApiHandling(async () =>
      axios.put(`${urlConfig.KKU_API_URL}/deliveries/done`, payload, {
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
