/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { FormContainerType } from "@/schemas/component/form";
import { useActionState, useEffect } from "react";

const initialState: { message?: string; ok?: boolean } = {};

export default function FormContainer({
  children,
  action,
  className,
}: FormContainerType) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.ok === true) {
      toast({
        title: state.message,
      });
    } else if (state.ok === false) {
      toast({
        variant: "destructive",
        title: state.message,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}
