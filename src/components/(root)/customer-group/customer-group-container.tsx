/** @format */

import { CreateOrUpdateCustomerGroupDialog } from "@/components/dialog/customer-group/create-or-update-group";
import CustomerGroupListTable from "@/components/table/customer-group-list-table";
import { Button } from "@/components/ui/button";
import { fetchCustomerGroups } from "@/server-actions/customer";
import { Plus } from "lucide-react";

export default async function CustomerGroupContainer() {
  const customerGroups = await fetchCustomerGroups();
  // console.log("Customer groups:", customerGroups);
  return (
    <>
      <div className="flex justify-end p-2">
        <CreateOrUpdateCustomerGroupDialog
          btn={
            <Button>
              <Plus /> เพิ่มกลุ่ม
            </Button>
          }
        />
      </div>
      <CustomerGroupListTable customerGroups={customerGroups} />
    </>
  );
}
