/** @format */

"use client";

import { getSession } from "@/utils/session.utils";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function BranchSignInButton({ branchId }: { branchId: string }) {
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleSignInBranch = async () => {
    await update({ branchId });
    router.push("/");
  };

  return <Button onClick={() => handleSignInBranch()}>เข้าสู่ระบบ</Button>;
}
