/** @format */

"use server";

import { StockInHistoryPageSearchParams } from "@/app/(root)/stock/in-history/page";
import { urlConfig } from "@/configs/url.config";
import { fetchStockInHistoriesResSchema } from "@/schemas/api/stock.schema";
import {
  AddStockInHistoryFormDataSchema,
  CancelStockInHistoryFormDataSchema,
  FirstAddStockInHistoryFormDataSchema,
} from "@/schemas/server-action/stock.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { paramUtils } from "@/utils/params.utils";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchStockInHistories(data?: {
  searchParams: StockInHistoryPageSearchParams;
}) {
  const user = (await getSession()).user;

  const { error, result } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/stock-histories/in/branch/${
          user.branchId
        }${paramUtils.searchParamsFormatToString(
          data?.searchParams || {}
        )}`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    { option: { validateResponse: fetchStockInHistoriesResSchema } }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}
export type StockInHistoryType = Awaited<
  ReturnType<typeof fetchStockInHistories>
>[number];

export async function addStockInHistoryAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/stock";
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(
      formData,
      AddStockInHistoryFormDataSchema
    );
    const { pathname, ...restData } = data;
    pathname && (_pathname = pathname);

    const payload = { branchId: user.branchId, ...restData };

    const { error } = await withApiHandling(async () =>
      axios.post(`${urlConfig.KKU_API_URL}/stocks/add`, payload, {
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

export async function firstAddStockInHistoryAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/stock";
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(
      formData,
      FirstAddStockInHistoryFormDataSchema
    );
    const { pathname, sellPrice, ...restData } = data;
    pathname && (_pathname = pathname);

    const payloadProductBranch = {
      branchId: user.branchId,
      productId: restData.productId,
      sellPrice: sellPrice,
    };

    const { error: error1 } = await withApiHandling(async () =>
      axios.post(
        `${urlConfig.KKU_API_URL}/product-sale-branches/add`,
        payloadProductBranch,
        { headers: buildHeaders({ token: user.token }) }
      )
    );

    if (error1.status === "error") {
      throw new Error(error1.errorMessage);
    }

    const payloadAdd = { branchId: user.branchId, ...restData };

    const { error } = await withApiHandling(async () =>
      axios.post(`${urlConfig.KKU_API_URL}/stocks/add`, payloadAdd, {
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

export async function cancelStockInHistoryAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/stock/in-history";
  try {
    const validated = validateFormDataWithZod(
      formData,
      CancelStockInHistoryFormDataSchema
    );

    const { pathname, stockInHistoryId, cancelNote } = validated;

    const user = (await getSession()).user;

    pathname && (_pathname = pathname);

    const payload = {
      cancelNote: cancelNote,
    };

    // console.log("Validated:", validated);

    const { error } = await withApiHandling(async () =>
      axios.patch(
        `${urlConfig.KKU_API_URL}/stock-histories/cancel/branch/${user.branchId}/${stockInHistoryId}`,
        payload,
        {
          headers: buildHeaders({ token: user.token }),
        }
      )
    );

    if (error.status === "error") {
      throw new Error(error.errorMessage);
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect(_pathname);
}
