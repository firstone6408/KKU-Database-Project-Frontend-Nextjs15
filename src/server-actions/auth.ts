/** @format */

import {
  renderFail,
  renderSuccess,
} from "@/utils/server-action-render.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { z } from "zod";

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
