/** @format */

import { PaymentMethodAddDialog } from "@/components/dialog/payment-method/payment-method-add";
import PaymentMethodsListTable from "@/components/table/payment-method-list-table";
import { Button } from "@/components/ui/button";
import { fetchPaymentMethods } from "@/server-actions/payment-method";
import { Plus } from "lucide-react";

export default async function PaymentMethodContainer() {
  const paymentMethods = await fetchPaymentMethods();
  return (
    <>
      <div className="flex justify-between items-center p-2">
        <div></div>
        <PaymentMethodAddDialog
          btn={
            <Button>
              <Plus />
              เพิ่มการชำระเงิน
            </Button>
          }
        />
      </div>
      <PaymentMethodsListTable paymentMethods={paymentMethods} />
    </>
  );
}
