/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { FormContainerType } from "@/schemas/component/form";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: { message?: string; ok?: boolean } = {};

export default function FormContainer({
  children,
  action,
  className,
  options,
}: FormContainerType) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const errorMessga = error;
      toast({
        variant: "destructive",
        title: errorMessga,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (state.ok === true) {
      toast({
        title: state.message,
      });
      if (options?.afterSubmit) {
        options.afterSubmit();
      }
    } else if (state.ok === false) {
      toast({
        variant: "destructive",
        title: state.message,
      });
    }
  }, [options?.afterSubmit, state]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}
