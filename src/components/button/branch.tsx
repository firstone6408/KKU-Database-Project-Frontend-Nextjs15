/** @format */

"use client";

import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import FormContainer from "../form/form-container";
import { removeBranchAction } from "@/server-actions/branch";

export function BranchSignInButton({ branchId }: { branchId: string }) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignInBranch = async () => {
    await update({ branchId });

    if (
      pathname === "/auth/login" ||
      pathname === "/auth/branch-sign-in"
    ) {
      router.push("/");
    } else {
      router.push(pathname);
    }
  };

  return <Button onClick={() => handleSignInBranch()}>เข้าสู่ระบบ</Button>;
}

export function RemoveBranchButton({
  branchId,
  btn,
  name,
}: {
  branchId: string;
  btn: any;
  name: string;
}) {
  const pathname = usePathname();
  return (
    <FormContainer action={removeBranchAction}>
      <input type="hidden" id={name} name={name} defaultValue={branchId} />
      <input
        type="hidden"
        id="pathname"
        name="pathname"
        defaultValue={pathname}
      />
      <Button variant={"destructive"} type="submit">
        {btn}
      </Button>
    </FormContainer>
  );
}
