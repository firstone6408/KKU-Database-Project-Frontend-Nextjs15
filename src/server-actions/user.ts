/** @format */

"use server";

import { urlConfig } from "@/configs/url.config";
import {
  FetchUserResSchema,
  FetchUsersResSchema,
} from "@/schemas/api/user.schema";
import {
  AddUserFormDataSchema,
  UpdateUserFormDataSchema,
} from "@/schemas/server-action/user.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchUsers() {
  const user = (await getSession()).user;

  const { error, result } = await withApiHandling(
    () =>
      axios.get(`${urlConfig.KKU_API_URL}/users/branch/${user.branchId}`, {
        headers: buildHeaders({ token: user.token }),
      }),
    { option: { validateResponse: FetchUsersResSchema } }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}
export type UserType = Awaited<ReturnType<typeof fetchUsers>>[number];

export async function fetchUserByUserId(userId?: string) {
  let _userId: string;

  const session = await getSession();

  if (userId) {
    _userId = userId;
  } else {
    _userId = session.user.id;
  }

  const { error, result } = await withApiHandling(
    async () =>
      axios.get(`${urlConfig.KKU_API_URL}/users/${_userId}`, {
        headers: buildHeaders({ token: session.user.token }),
      }),
    {
      option: { validateResponse: FetchUserResSchema },
    }
  );

  if (error.status === "error") {
    throw new Error(error.errorMessage);
  }

  return result.payload.data;
}

export async function addUserAction(prevState: any, formData: FormData) {
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(formData, AddUserFormDataSchema);

    const { phoneNumber, profileImage, ...restData } = data;

    let payload: any = {
      ...restData,
    };

    if (profileImage && profileImage.size > 0) {
      payload.profileImage = profileImage;
      //  console.log("file", payload.profileImage);
    }

    if (phoneNumber || phoneNumber !== "") {
      payload.phoneNumber = phoneNumber;
    }

    const { error } = await withApiHandling(() =>
      axios.post(`${urlConfig.KKU_API_URL}/users`, payload, {
        headers: buildHeaders({ token: user.token, uploadHeaders: true }),
      })
    );

    if (error.status === "error") {
      return renderFail({ error: error.errorMessage });
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/user");
}

export async function updateUserAction(
  prevState: any,
  formData: FormData
) {
  let _pathname: string = "/user";
  try {
    const user = (await getSession()).user;

    const data = validateFormDataWithZod(
      formData,
      UpdateUserFormDataSchema
    );

    console.log("Data:", data);
    data.pathname && (_pathname = data.pathname);

    const payloadFormData = new FormData();
    payloadFormData.append("username", data.username);
    payloadFormData.append("name", data.name);
    payloadFormData.append("email", data.email);
    payloadFormData.append("phoneNumber", data.phoneNumber);

    if (data.status) {
      payloadFormData.append("status", data.status);
    }
    if (data.role) {
      payloadFormData.append("role", data.role);
    }

    if (data.profileImage && data.profileImage.size > 0) {
      payloadFormData.append("profileImage", data.profileImage);
    }

    if (data.password && data.password !== "") {
      payloadFormData.append("password", data.password);
    }

    //  console.log("FormData:", Object.fromEntries(payloadFormData));

    const { error } = await withApiHandling(() =>
      axios.put(
        `${urlConfig.KKU_API_URL}/users/${data.userId}`,
        payloadFormData,
        {
          headers: buildHeaders({
            token: user.token,
            uploadHeaders: true,
          }),
        }
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
