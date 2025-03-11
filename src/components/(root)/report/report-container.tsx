/** @format */

import ReportListTable from "@/components/table/report-list-table";
import ReportSearch from "./report-search";
import { fetchOrdersByBranchId } from "@/server-actions/order";
import { ReportPageSearchParams } from "@/app/(root)/report/page";
import ReportTotalCard from "@/components/card/report-total";

type ReportContainerProps = {
  searchParams: ReportPageSearchParams;
};

export default async function ReportContainer({
  searchParams,
}: ReportContainerProps) {
  const reports = await fetchOrdersByBranchId({ searchParams });

  // console.log(reports);
  return (
    <div className="space-y-2">
      <ReportSearch />
      <ReportTotalCard reports={reports} />
      <ReportListTable reports={reports} />
    </div>
  );
}
