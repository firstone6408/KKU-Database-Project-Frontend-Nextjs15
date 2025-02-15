/** @format */

import { urlConfig } from "@/configs/url.config";
import { UpdatePriceFormDataSchema } from "@/schemas/server-action/product-price-branch.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function updatePriceAction(
  prevState: any,
  formData: FormData
) {
  let _pathname = "/stock";
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(
      formData,
      UpdatePriceFormDataSchema
    );
    const { pathname, ...restData } = data;
    pathname && (_pathname = pathname);

    const payload = {
      branchId: user.branchId,
      productId: restData.productId,
      sellPrice: restData.sellPrice,
    };

    const { error } = await withApiHandling(async () =>
      axios.post(
        `${urlConfig.KKU_API_URL}/product-sale-branches/add`,
        payload,
        { headers: buildHeaders({ token: user.token }) }
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
