import { urlConfig } from "@/configs/url.config";
import { fetchUserResSchema } from "@/schemas/api/user.schema";
import { AddUserFormDataSchema } from "@/schemas/server-action/user.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchUsers()
{
    const user = (await getSession()).user;

    const { result } = await withApiHandling(() =>
        axios.get(`${urlConfig.KKU_API_URL}/users/branch/${user.branchId}`,
            { headers: buildHeaders({ token: user.token }) }
        ),
        { option: { validateResponse: fetchUserResSchema } }
    );

    return result.payload.data;
}
export type UserType = Awaited<ReturnType<typeof fetchUsers>>[number];


export async function addUserAction(prevState: any, formData: FormData)
{
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, AddUserFormDataSchema);

        const { phoneNumber, profileImage, ...restData } = data;

        let payload: any = {
            ...restData
        }

        payload.branchId = user.branchId;

        if (profileImage && profileImage.size > 0)
        {
            payload.profileImage = profileImage
            console.log('file', payload.profileImage)
        }

        if (phoneNumber || phoneNumber !== "")
        {
            payload.phoneNumber = phoneNumber;
        }

        const { error } = await withApiHandling(() =>
            axios.post(`${urlConfig.KKU_API_URL}/users`,
                payload,
                { headers: buildHeaders({ token: user.token, uploadHeaders: true }), }
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

    redirect("/user");
}

export async function updateUserAction(prevState: any, formData: FormData)
{
    try
    {
        const user = (await getSession()).user;

        const data = validateFormDataWithZod(formData, AddUserFormDataSchema);

        const { phoneNumber, profileImage, ...restData } = data;

        let payload: any = {
            ...restData
        }

        if (profileImage && profileImage.size > 0)
        {
            payload.profileImage = profileImage
        }

        if (phoneNumber || phoneNumber !== "")
        {
            payload.phoneNumber = phoneNumber;
        }

        await withApiHandling(() =>
            axios.post(`${urlConfig.KKU_API_URL}/users`,
                payload,
                { headers: buildHeaders({ token: user.token }) }
            )
        );

    } catch (error)
    {
        return renderFail({ error });
    }

    redirect("/user");
}