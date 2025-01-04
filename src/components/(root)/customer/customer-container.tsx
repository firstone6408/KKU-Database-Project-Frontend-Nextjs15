/** @format */

import CustomersListTable from "@/components/table/customer-list-table";
import { fetchCustomers } from "@/server-actions/customer";
import CustomerSearch from "./customer-search";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { CustomerAddDialog } from "@/components/dialog/customer/customer-add";

export default async function CustomerContainer() {
  const customers = await fetchCustomers();
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <CustomerSearch />
        <CustomerAddDialog
          btn={
            <Button>
              <UserPlus />
            </Button>
          }
        />
      </div>

      <CustomersListTable customers={customers} />
    </div>
  );
}
