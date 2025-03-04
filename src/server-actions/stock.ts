/** @format */

import { StockPageSearchParams } from "@/app/(root)/stock/page";
import { urlConfig } from "@/configs/url.config";
import { fetchStocksResSchema } from "@/schemas/api/stock.schema";
import { AddStockFormDataSchema } from "@/schemas/server-action/stock.schema";
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

export async function fetchStockProducts(data?: {
  searchParams: StockPageSearchParams;
}) {
  const user = (await getSession()).user;

  //console.log(user);

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/products/branch/${
          user.branchId
        }${paramUtils.searchParamsFormatToString(
          data?.searchParams || {}
        )}`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    { option: { validateResponse: fetchStocksResSchema } }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}
export type StockProductType = Awaited<
  ReturnType<typeof fetchStockProducts>
>[number];

export async function fetchStockProductsAvailable() {
  const user = (await getSession()).user;

  const { result, error } = await withApiHandling(
    async () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/products/branch/${user.branchId}/available`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    { option: { validateResponse: fetchStocksResSchema } }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

export async function addStock(prev: any, formData: FormData) {
  let _pathname = "/stock";
  try {
    const formdata = Object.fromEntries(formData) as any;
    const stockInItemsArray = JSON.parse(formdata.stockInItems);

    const validated = AddStockFormDataSchema.safeParse({
      pathname: formData.get("pathname"),
      refCode: formData.get("refCode"),
      distributor: formData.get("distributor"),
      note: formData.get("note"),
      stockInItems: stockInItemsArray,
    });

    if (!validated.success || !validated.data) {
      validateError(validated.error);
      throw new Error("");
    }

    const user = (await getSession()).user;
    const data = validated.data;
    data.pathname && (_pathname = data.pathname);

    const payload = {
      branchId: user.branchId,
      refCode: data.refCode,
      distributor: data.distributor,
      note: data.note,
      stockInItems: data.stockInItems,
    };

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
