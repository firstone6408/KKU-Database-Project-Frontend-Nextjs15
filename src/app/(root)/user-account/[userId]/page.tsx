/** @format */

import UserAccountContainer from "@/components/(root)/user-account/user-account-container";
import { Suspense } from "react";

type Params = {
  userId: string;
};

type UserAccountPageProps = {
  params: Promise<Params>;
};

export default async function UserAccountPage({
  params,
}: UserAccountPageProps) {
  const { userId } = await params;

  return (
    <Suspense fallback={<p>รอสักครู่ ...</p>}>
      <UserAccountContainer userId={userId} />
    </Suspense>
  );
}
