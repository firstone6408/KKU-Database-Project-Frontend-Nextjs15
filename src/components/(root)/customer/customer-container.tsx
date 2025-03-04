/** @format */

import CustomersListTable from "@/components/table/customer-list-table";
import {
  fetchCustomerGroups,
  fetchCustomers,
} from "@/server-actions/customer";
import CustomerSearch from "./customer-search";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { CustomerAddDialog } from "@/components/dialog/customer/customer-add";
import { CustomerPageSearchPaParams } from "@/app/(root)/customer/page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type CustomerContainerProps = {
  searchParams: CustomerPageSearchPaParams;
};

export default async function CustomerContainer({
  searchParams,
}: CustomerContainerProps) {
  const customers = await fetchCustomers({ searchParams });
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader className="font-semibold">
          ค้นหาสำหรับลูกค้า
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <CustomerSearch />
          <CustomerAddDialog
            btn={
              <Button>
                <UserPlus /> เพิ่มลูกค้า
              </Button>
            }
          />
        </CardContent>
      </Card>

      <CustomersListTable customers={customers} />
    </div>
  );
}
