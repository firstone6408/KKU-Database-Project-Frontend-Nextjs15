/** @format */

import ReportListTable from "@/components/table/report-list-table";
import ReportSearch from "./report-search";
import { fetchOrdersByBranchId } from "@/server-actions/order";

export default async function ReportContainer() {
  const reports = await fetchOrdersByBranchId();
  return (
    <>
      <ReportSearch />
      <ReportListTable reports={reports} />
    </>
  );
}
