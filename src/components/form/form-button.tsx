/** @format */

"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

export default function FormButton({
  className,
  size,
  btnText,
}: {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  btnText: any;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      type="submit"
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          <span>Please wait</span>
          <Ellipsis className="animate-pulse" />
        </>
      ) : (
        <p>{btnText}</p>
      )}
    </Button>
  );
}
