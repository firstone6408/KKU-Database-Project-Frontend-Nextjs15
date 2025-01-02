import { urlConfig } from "@/configs/url.config";
import { fetchCategoriesResSchema } from "@/schemas/api/category.schema";
import { AddCategoryFormDataSchema, RemoveCategoryFormDataSchema, UpdateCategoryFormDataSchema } from "@/schemas/server-action/category.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchCategories()
{
    const user = (await getSession()).user;

    const { result, error } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/categories`,
            { headers: buildHeaders({ token: user.token }) }
        ),
        { option: { validateResponse: fetchCategoriesResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data
}
export type CategoryType = Awaited<ReturnType<typeof fetchCategories>>[number];

export async function addCategoryAction(prevState: any, formData: FormData)
{
    let _pathname = "/category"
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, AddCategoryFormDataSchema);
        const { pathname, ...payload } = data;
        pathname && (_pathname = pathname);

        const { error } = await withApiHandling(async () =>
            axios.post(`${urlConfig.KKU_API_URL}/categories`,
                payload,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: error.errorMessage });
        }
    }
    catch (error)
    {
        return renderFail({ error });
    }
    redirect(_pathname)
}

export async function updateCategoryAction(prevState: any, formData: FormData)
{
    let _pathname = "/category"
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, UpdateCategoryFormDataSchema);
        data.pathname && (_pathname = data.pathname);

        const { pathname, id, ...payload } = data;

        const { error } = await withApiHandling(async () =>
            axios.put(`${urlConfig.KKU_API_URL}/categories/${id}`,
                payload,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: error.errorMessage });
        }
    }
    catch (error)
    {
        return renderFail({ error });
    }
    redirect(_pathname)
}

export async function removeCategoryAction(prevState: any, formData: FormData)
{
    let _pathname = "/category"
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, RemoveCategoryFormDataSchema);
        data.pathname && (_pathname = data.pathname);

        const { error } = await withApiHandling(async () =>
            axios.delete(`${urlConfig.KKU_API_URL}/categories/${data.id}`,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

        if (error.status === "error")
        {
            return renderFail({ error: error.errorMessage });
        }
    }
    catch (error)
    {
        return renderFail({ error });
    }
    redirect(_pathname)
}

