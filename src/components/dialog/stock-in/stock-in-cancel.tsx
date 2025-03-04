/** @format */

/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../../form/form-container";
import {
  cancelStockInHistoryAction,
  StockInHistoryType,
} from "@/server-actions/stock-in-history";
import FormTextArea from "@/components/form/form-textarea";
import FormButton from "@/components/form/form-button";

type StockInHistoryCancelDialogType = {
  btn: any;
  stockIn: StockInHistoryType;
};

export function StockInHistoryCancelDialog({
  btn,
  stockIn,
}: StockInHistoryCancelDialogType) {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-xl">
        <DialogHeader>
          <DialogTitle>
            เหตุผลในการยกเลิก บิลนำเข้า #{stockIn.refCode}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer
          action={cancelStockInHistoryAction}
          className="space-y-2"
        >
          <input
            type="hidden"
            name="stockInHistoryId"
            defaultValue={stockIn.id}
          />
          <FormTextArea name="cancelNote" rows={5} required />
          <div className="flex justify-end">
            <FormButton btnText={"บันทึก"} />
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
