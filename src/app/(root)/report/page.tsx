/** @format */

import ReportContainer from "@/components/(root)/report/report-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function ReportPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <ReportContainer />
    </Suspense>
  );
}
