/** @format */

import { BranchType } from "@/server-actions/branch";
import { OrderType } from "@/server-actions/order";
import DocumentReceiptHead from "./head";
import DocumentReceiptTable from "./table";
import DocumentReceiptMoney from "./money";

export type ReceiptsAndDeliveryNotesType = "Receipt" | "DeliveryNote";

type ReceiptsAndDeliveryNotesProps = {
  order: OrderType;
  branch: BranchType;
  type: ReceiptsAndDeliveryNotesType;
};

export default function ReceiptsAndDeliveryNotes({
  order,
  branch,
  type,
}: ReceiptsAndDeliveryNotesProps) {
  return (
    <section className="px-36 py-10 space-y-5">
      {/* Header */}
      <DocumentReceiptHead branch={branch} order={order} type={type} />
      {/* End Header */}

      {/* Table */}
      <DocumentReceiptTable order={order} type={type} />
      {/* End Table */}

      {/* Money */}
      <DocumentReceiptMoney order={order} type={type} />
      {/* End Money */}
    </section>
  );
}
