import { urlConfig } from "@/configs/url.config";
import { fetchBranchesResSchema } from "@/schemas/api/branch.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateResponseFromServer } from "@/utils/validate.utils";
import axios from "axios";

export async function fetchBranches()
{
    const user = (await getSession()).user;

    // console.log(user)

    const { result, error } = await withApiHandling(() =>
        axios.get(`${urlConfig.KKU_API_URL}/branches/`,
            { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: fetchBranchesResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    //console.log(error)


    return result.payload.data;
}
export type BranchType = Awaited<ReturnType<typeof fetchBranches>>[number];