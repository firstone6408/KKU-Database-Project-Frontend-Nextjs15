import { urlConfig } from "@/configs/url.config";
import { fetchProductsResSchema } from "@/schemas/api/product.schema";
import { AddProductFormDataSchema, UpdateProductFormDataSchema } from "@/schemas/server-action/product.schema";
import { withApiHandling } from "@/utils/api.utils"
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/dist/client/components/navigation";


export async function fetchProducts()
{
    const user = (await getSession()).user;

    const { result, error } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/products`,
            { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: fetchProductsResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data
}
export type ProductType = Awaited<ReturnType<typeof fetchProducts>>[number];



export async function updateProduct(prevState: any, formData: FormData)
{
    let _pathname = "/product";
    try
    {
        const user = (await getSession()).user;

        const validateData = validateFormDataWithZod(formData, UpdateProductFormDataSchema);

        const { pathname, image, id, ...restData } = validateData;
        pathname && (_pathname = pathname);

        const payload: any = { ...restData };

        if (image && image.size > 0)
        {
            payload.image = image;
        }

        // console.log(payload)

        const { error } = await withApiHandling(async () =>
            axios.put(`${urlConfig.KKU_API_URL}/products/${id}`,
                payload,
                { headers: buildHeaders({ token: user.token, uploadHeaders: true }) }
            )
        );
        //"ไม่สามารถทำการบันทึกได้ เนื่องจากชื่อหรือรหัส มีอยู่ในระบบแล้ว"
        if (error.status === "error")
        {
            console.log(error.errorMessage)
            return renderFail({ error: error.errorMessage });
        }
    }
    catch (error)
    {
        return renderFail({ error });
    }

    redirect(_pathname);
}

export async function addProduct(prevState: any, formData: FormData)
{
    let _pathname = "/product";
    try
    {
        const user = (await getSession()).user;

        const validateData = validateFormDataWithZod(formData, AddProductFormDataSchema);

        const { pathname, image, ...restData } = validateData;
        pathname && (_pathname = pathname);

        const payload: any = { ...restData };

        if (image && image.size > 0)
        {
            payload.image = image;
        }

        // console.log(payload)

        const { error } = await withApiHandling(async () =>
            axios.post(`${urlConfig.KKU_API_URL}/products`,
                payload,
                { headers: buildHeaders({ token: user.token, uploadHeaders: true }) }
            )
        );
        //"ไม่สามารถทำการบันทึกได้ เนื่องจากชื่อหรือรหัส มีอยู่ในระบบแล้ว"
        if (error.status === "error")
        {
            console.log(error.errorMessage)
            return renderFail({ error: error.errorMessage });
        }
    }
    catch (error)
    {
        return renderFail({ error });
    }

    redirect(_pathname);
}

export async function fetchUnstockedProductsByBranch()
{
    const user = (await getSession()).user;

    const { result, error } = await withApiHandling(async () =>
        axios.get(`${urlConfig.KKU_API_URL}/products/branch/${user.branchId}/unstocked-products`,
            { headers: buildHeaders({ token: user.token }) }
        ), { option: { validateResponse: fetchProductsResSchema } }
    );

    if (error.status === "error")
    {
        throw new Error(error.errorMessage);
    }

    return result.payload.data
}