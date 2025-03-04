/** @format */

import DeliveryContainer from "@/components/(root)/delivery/delivery-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type DeliveryPageSearchParams = {
  trackNumber: string;
  type: string;
  distStart: string;
  distEnd: string;
  startDate: string;
  endDate: string;
  isMe: string;
};

type DeliveryPageProps = {
  searchParams: Promise<DeliveryPageSearchParams>;
};

export default async function DeliveryPage({
  searchParams,
}: DeliveryPageProps) {
  const search = await searchParams;
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <DeliveryContainer searchParams={search} />
    </Suspense>
  );
}
