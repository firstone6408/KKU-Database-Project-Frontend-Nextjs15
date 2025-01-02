/** @format */

import UserContainer from "@/components/(root)/user/user-container";
import CustomerLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function UserPage() {
  return (
    <Suspense fallback={<CustomerLoadingSkeleton />}>
      <UserContainer />
    </Suspense>
  );
}
