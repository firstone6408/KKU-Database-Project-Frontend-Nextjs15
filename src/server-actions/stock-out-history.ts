import { urlConfig } from "@/configs/url.config";
import { fetchStockOutHistoriesResSchema } from "@/schemas/api/stock.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { getSession } from "@/utils/session.utils";
import axios from "axios";

export async function fetchStockOutHistories()
{
    const user = (await getSession()).user;

    const { error, result } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/stocks/branch/${user.branchId}/stock-out-history`,
            { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: fetchStockOutHistoriesResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data;
}
export type StockOutHistoryType = Awaited<ReturnType<typeof fetchStockOutHistories>>[number];