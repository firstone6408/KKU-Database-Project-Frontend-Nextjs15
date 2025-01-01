import { urlConfig } from "@/configs/url.config";
import { fetchUserResSchema } from "@/schemas/api/user.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchUsers()
{
    const user = (await getSession()).user;

    const { result } = await withApiHandling(() =>
        axios.get(`${urlConfig.KKU_API_URL}/users/`,
            { headers: buildHeaders({ token: user.token }) }
        ),
        { option: { validateResponse: fetchUserResSchema } }
    );

    return result.payload.data;
}
export type UserType = Awaited<ReturnType<typeof fetchUsers>>[number];


export async function updateUser(prevState: any, formData: FormData)
{
    try
    {

    } catch (error)
    {
        return renderFail({ error });
    }

    redirect("/user");
}