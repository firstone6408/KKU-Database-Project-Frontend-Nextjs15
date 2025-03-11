/** @format */

import { BillCreateDialog } from "@/components/dialog/bill/bill-create";
import OrderListTable from "@/components/table/order-list-table";
import { Button } from "@/components/ui/button";
import { OrderStatusType } from "@/configs/enum.config";
import { fetchOrderByBranchIdAndUserId } from "@/server-actions/order";
import { Plus } from "lucide-react";

export default async function BillContainer() {
  const orders = await fetchOrderByBranchIdAndUserId({
    status: OrderStatusType.PENDING,
  });
  //console.log("Orders:", orders);
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
      <OrderListTable orders={orders} />
    </>
  );
}
