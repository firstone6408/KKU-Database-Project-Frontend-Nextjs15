/** @format */

import SaleContainer from "@/components/(root)/sale/sale-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type SalePageSearchParamsType = {
  orderId: string;
  orderCode: string;
  customerId: string;
};

export default async function SalePage(props: {
  searchParams: SearchParams;
}) {
  const searchParams =
    (await props.searchParams) as SalePageSearchParamsType;

  // console.log("Customer ID:", searchParams.customerId);
  // console.log("Order Code:", searchParams.orderCode);

  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <SaleContainer params={searchParams} />
    </Suspense>
  );
}
