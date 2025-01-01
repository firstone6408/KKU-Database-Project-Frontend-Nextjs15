import { urlConfig } from "@/configs/url.config";
import { fetchBranchesResSchema } from "@/schemas/api/branch.schema";
import { buildHeaders } from "@/utils/httpHeaders";
import { getSession } from "@/utils/session.utils";
import { validateResponseFromServer } from "@/utils/validate.utils";
import axios from "axios";

export async function fetchBranches()
{
    const user = (await getSession()).user;

    const response = await axios.get(`${urlConfig.KKU_API_URL}/branches/`,
        { headers: buildHeaders({ token: user.token }) }
    );

    const data = validateResponseFromServer(response, fetchBranchesResSchema);

    return data.payload.data;
}
export type BranchType = Awaited<ReturnType<typeof fetchBranches>>[number];