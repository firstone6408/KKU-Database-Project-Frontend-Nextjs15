/** @format */

import CustomerContainer from "@/components/(root)/customer/customer-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type CustomerPageSearchPaParams = {
  name: string;
  customerGroupId: string;
};

type CustomerPageType = {
  searchParams: Promise<CustomerPageSearchPaParams>;
};

export default async function CustomerPage({
  searchParams,
}: CustomerPageType) {
  const search = await searchParams;

  // console.log("search:", search);
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <CustomerContainer searchParams={search} />
    </Suspense>
  );
}
