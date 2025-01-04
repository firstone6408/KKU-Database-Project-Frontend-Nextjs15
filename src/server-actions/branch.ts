import { urlConfig } from "@/configs/url.config";
import { fetchBranchesResSchema, getBranchByIdResSchema } from "@/schemas/api/branch.schema";
import { AddBranchFormDataSchema, RemoveBranchFormDataSchema, UpdateBranchFormDataSchema } from "@/schemas/server-action/branch.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

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

export async function getBranchById(branchId?: string)
{
    const user = (await getSession()).user;

    let id: string;

    if (branchId)
    {
        id = branchId;
    }
    else
    {
        id = user.branchId ?? "";
    }

    const { result, error } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/branches/${id}`
            , { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: getBranchByIdResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data;
}

export async function updateBranchAction(prevState: any, formData: FormData)
{
    let _pathname = "/branch";
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, UpdateBranchFormDataSchema);
        const { pathname, id, ...payload } = data;
        pathname && (_pathname = pathname);

        const { error } = await withApiHandling(async () =>
            axios.put(`${urlConfig.KKU_API_URL}/branches/${id}`,
                payload,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: error.errorMessage });
        }

    } catch (error)
    {
        return renderFail({ error });
    }

    redirect(_pathname);
}

export async function addBranchAction(prevState: any, formData: FormData)
{
    let _pathname = "/branch";
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, AddBranchFormDataSchema);
        const { pathname, ...payload } = data;
        pathname && (_pathname = pathname);

        const { error } = await withApiHandling(async () =>
            axios.post(`${urlConfig.KKU_API_URL}/branches`,
                payload,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: error.errorMessage });
        }
    } catch (error)
    {
        return renderFail({ error });
    }

    redirect(_pathname);
}

export async function removeBranchAction(prevState: any, formData: FormData)
{
    let _pathname = "/branch";
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, RemoveBranchFormDataSchema);
        const { pathname, id } = data;
        pathname && (_pathname = pathname);

        const { error } = await withApiHandling(async () =>
            axios.delete(`${urlConfig.KKU_API_URL}/branches/${id}`,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: "ไม่สามารถลบสาขา" });
        }

    } catch (error)
    {
        return renderFail({ error });
    }

    redirect(_pathname);
}