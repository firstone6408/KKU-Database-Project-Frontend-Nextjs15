/** @format */

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleSignInButton from "../auth/google-sign-in-button";
import FormContainer from "./form-container";
import { signInAction } from "@/server-actions/auth";
import FormInput from "./form-input";
import FormButton from "./form-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            ใส่ Username, Password ของคุณ หรือ เข้าสู่ระบบด้วย Google
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormContainer action={signInAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="abc123..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <FormButton btnText="Login" />
            </div>
          </FormContainer>
          <GoogleSignInButton className="w-full" variant={"outline"} />
        </CardContent>
      </Card>
    </div>
  );
}
