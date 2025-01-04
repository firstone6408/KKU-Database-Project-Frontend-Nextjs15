import { urlConfig } from "@/configs/url.config";
import { fetchStocksResSchema } from "@/schemas/api/stock.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { getSession } from "@/utils/session.utils";
import axios from "axios";

export async function fetchStocks()
{
    const user = (await getSession()).user;

    const { result, error } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/products/branch/${user.branchId}`,
            { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: fetchStocksResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data;
}
export type StockType = Awaited<ReturnType<typeof fetchStocks>>[number];