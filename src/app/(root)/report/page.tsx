/** @format */

import ReportContainer from "@/components/(root)/report/report-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export type ReportPageSearchParams = {
  orderCode: string;
  orderType: string;
  orderStatus: string;
  startDate: string;
  endDate: string;
};

type ReportPageProps = {
  searchParams: Promise<ReportPageSearchParams>;
};

export default async function ReportPage({
  searchParams,
}: ReportPageProps) {
  const search = await searchParams;
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <ReportContainer searchParams={search} />
    </Suspense>
  );
}
