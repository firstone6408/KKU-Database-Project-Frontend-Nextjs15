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
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import UnstockedProductsDropdown from "@/components/dropdown/product-branch-unstocked-products";
import { usePathname } from "next/navigation";
import FormButton from "@/components/form/form-button";
import { firstAddStockInHistoryAction } from "@/server-actions/stock-in-history";

export function StockAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>เพิ่ม Stock</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer
          action={firstAddStockInHistoryAction}
          className="space-y-2"
        >
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <UnstockedProductsDropdown
              label="สินค้า"
              placeholder="-- เลือกสินค้า --"
              name="productId"
              required
              className="col-span-full"
            />
            <FormInput
              label="ราคาขาย"
              name="sellPrice"
              type="number"
              required
              className="col-span-full"
            />
            <FormInput
              label="รหัสนำเข้า"
              name="refCode"
              required
              className="col-span-full"
            />
            <FormInput
              label="ราคาค้นทุน"
              name="costPrice"
              type="number"
              required
            />
            <FormInput
              label="จำนวน"
              name="quantity"
              type="number"
              required
            />
            <FormTextArea
              label="หมายเหตุ"
              name="note"
              className="col-span-full"
              rows={4}
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
