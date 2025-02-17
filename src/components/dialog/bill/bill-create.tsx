/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../../form/form-container";
import { usePathname } from "next/navigation";
import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";
import { useEffect, useState } from "react";
import { CustomerType, fetchCustomers } from "@/server-actions/customer";
import CustomersListSetTable from "@/components/table/customer-list-set-table";
import { createOrderAction } from "@/server-actions/order";

export function BillCreateDialog(props: { btn: any }) {
  const { btn } = props;
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const [customerId, setCustomerId] = useState<string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const results = await fetchCustomers();
      setCustomers(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>รอสักครู่...</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-xl">
        <DialogHeader>
          <DialogTitle>เปิดบิลใหม่</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={createOrderAction} className="space-y-2">
          <input type="hidden" name="pathname" defaultValue={pathname} />
          <input
            type="hidden"
            name="customerId"
            defaultValue={customerId}
          />

          <FormInput label="รหัสบืล" name="orderCode" required />
          <div className="h-[30rem] overflow-y-auto">
            <CustomersListSetTable
              customers={customers}
              customerId={customerId}
              setCustomerId={setCustomerId}
            />
          </div>
          <DialogFooter>
            <FormButton btnText="บันทึก" />
          </DialogFooter>
        </FormContainer>

        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
