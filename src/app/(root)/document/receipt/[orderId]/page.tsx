/** @format */

import ReceiptsAndDeliveryNotes from "@/components/documents/receipt";
import { getBranchById } from "@/server-actions/branch";
import { fetchOrdersByBranchIdAndOrderId } from "@/server-actions/order";
import { Suspense } from "react";

type Params = {
  orderId: string;
};

type ReceiptPageProps = {
  params: Promise<Params>;
};

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { orderId } = await params;
  const order = await fetchOrdersByBranchIdAndOrderId(orderId);
  const branch = await getBranchById();

  if (!order) {
    return (
      <p className="text-red-600 text-xl font-semibold">
        -- ไม่พบรายการ --
      </p>
    );
  }

  return (
    <Suspense fallback={<p>รอสักครู่ ...</p>}>
      <ReceiptsAndDeliveryNotes
        order={order}
        branch={branch}
        type="Receipt"
      />
    </Suspense>
  );
}
