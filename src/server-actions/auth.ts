/** @format */

import { urlConfig } from "@/configs/url.config";
import {
  renderFail,
  renderSuccess,
} from "@/utils/server-action-render.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/utils/session.utils";
import { buildHeaders } from "@/utils/httpHeaders";

const SignInFormDataZod = z.object({
  username: z.string().min(2, "กรุณาใส่ username มากกว่า 2 ตัวอักษร"),
  password: z.string(),
});

export async function signInAction(prevState: any, formData: FormData) {
  try {
    const data = validateFormDataWithZod(formData, SignInFormDataZod);
    const response = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (!response?.ok) {
      return renderFail({ error: "Login failed" });
    }

    // return renderSuccess({ message: "Login success" });
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/auth/branch-sign-in");
}

export async function signOutAction() {
  const user = (await getSession()).user;

  try {
    const response = await axios.post(
      `${urlConfig.KKU_API_URL}/auth/logout`,
      {},
      { headers: buildHeaders({ token: user.token }) }
    );

    // console.log(response.data);
    if (!response.data.ok) {
      throw new Error("Logout failed");
    }

    await signOut({ callbackUrl: "/auth/login" });
  } catch (error) {
    return renderFail({ error });
  }
}
