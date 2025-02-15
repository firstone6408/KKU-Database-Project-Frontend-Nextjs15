/** @format */

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
import {
  addStockInHistoryAction,
  StockInHistoryType,
} from "@/server-actions/stock-in-history";
import FormImage from "@/components/form/form-image";
import { urlConfig } from "@/configs/url.config";
import FormTextArea from "@/components/form/form-textarea";
import StockInHistoriesListTable from "@/components/table/stock-in-list-table";
import StockInHistoriesDetailsTable from "@/components/table/stock-in-details-table";
import { dayjsUtils } from "@/utils/date.utils";

export function StockInHistoryDetailsDialog(props: {
  btn: any;
  stockIn: StockInHistoryType;
}) {
  const { btn, stockIn } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-3xl">
        <DialogHeader>
          <DialogTitle>รายละเอียดการเพิ่ม Stock</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="รหัสนำเข้า"
              defaultValue={stockIn.refCode}
              disabled
            />
            <FormInput
              label="ผู้จัดจำหน่าย"
              defaultValue={stockIn.distributor}
              disabled
            />
            <FormInput
              label="ประเภท"
              defaultValue={stockIn.type}
              disabled
            />
            <FormInput
              label="นำเข้าวันที่"
              defaultValue={dayjsUtils.autoFormat(stockIn.createdAt)}
              disabled
            />
            <div className="col-span-full py-2">
              <h2 className="font-semibold">พนักงานที่นำเข้า</h2>
              <div className="grid grid-cols-2 gap-2">
                <FormInput
                  label="ชื่อ"
                  defaultValue={stockIn.user.name}
                  disabled
                />
                <FormInput
                  label="Email"
                  defaultValue={stockIn.user.email}
                  disabled
                />
              </div>
            </div>
            <FormTextArea
              label="รายละเอียด"
              defaultValue={stockIn.note}
              className="col-span-full"
              rows={4}
              disabled
            />
            <div className="col-span-full space-y-2">
              <StockInHistoriesDetailsTable stockInHistories={stockIn} />
              <div className="flex justify-end">
                <FormInput
                  label="จำนวนเงินทั้งหมด (บาท)"
                  defaultValue={stockIn.totalPrice.toLocaleString()}
                  disabled
                />
              </div>
            </div>
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
