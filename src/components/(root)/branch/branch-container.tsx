/** @format */

import BranchListTable from "@/components/table/branch-list-table";
import { fetchBranches } from "@/server-actions/branch";
import BranchSearch from "./branch-search";
import { BranchAddDialog } from "@/components/dialog/branch/branch-add";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function BranchContainer() {
  const branches = await fetchBranches();
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <BranchSearch />
        <BranchAddDialog
          btn={
            <Button>
              <Plus />
              เพิ่มสาขา
            </Button>
          }
        />
      </div>
      <BranchListTable branches={branches} />
    </>
  );
}
