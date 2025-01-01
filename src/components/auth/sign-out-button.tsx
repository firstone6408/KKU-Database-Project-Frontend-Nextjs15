/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Ellipsis } from "lucide-react";
import { signOutAction } from "@/server-actions/auth";

export function SignOutButton({ btnText }: { btnText?: any }) {
  const { toast } = useToast();

  const { pending } = useFormStatus();

  const handleSignOut = async () => {
    try {
      await signOutAction();

      toast({
        title: "Sign out success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: String(error),
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      className="bg-red-600 hover:bg-red-500 w-full"
      onClick={() => handleSignOut()}
      disabled={pending}
    >
      {pending ? (
        <>
          <span>Please wait</span>
          <Ellipsis className="animate-pulse" />
        </>
      ) : (
        <>{btnText ? btnText : <p>Logout</p>}</>
      )}
    </Button>
  );
}
