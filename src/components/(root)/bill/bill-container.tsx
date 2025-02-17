/** @format */

import { BillCreateDialog } from "@/components/dialog/bill/bill-create";
import BillsListTable from "@/components/table/bill-list-table";
import { Button } from "@/components/ui/button";
import { fetchOrderByUser } from "@/server-actions/order";
import { Plus } from "lucide-react";

export default async function BillContainer() {
  const orders = await fetchOrderByUser();
  return (
    <>
      <div className="flex justify-end p-2">
        <BillCreateDialog
          btn={
            <Button>
              <Plus />
            </Button>
          }
        />
      </div>
      <BillsListTable orders={orders} />
    </>
  );
}
