/** @format */

"use client";

import { GoogleSignInButtonType } from "@/schemas/component/form";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function GoogleSignInButton({
  className,
  btnText,
  variant,
}: GoogleSignInButtonType) {
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/auth/branch-sign-in",
        redirect: false,
      });
    } catch (error) {
      toast({
        title: String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => handleSignIn()}
    >
      {btnText ?? "Sign In With Google"}
    </Button>
  );
}
