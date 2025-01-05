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
import { StockType } from "@/server-actions/stock";
import { updatePriceAction } from "@/server-actions/product-sale-branch";

export function AdjustPriceDialog(props: { btn: any; stock: StockType }) {
  const { btn, stock } = props;
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>ปรับราคาขาย</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updatePriceAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <input
              type="hidden"
              name="productId"
              defaultValue={stock.product.id}
            />
            <FormInput
              label="รหัส"
              defaultValue={stock.product.productCode}
              disabled
            />
            <FormInput
              label="หมวดหมู่"
              defaultValue={stock.product.category.name}
              disabled
            />
            <FormInput
              label="ชื่อ"
              defaultValue={stock.product.name}
              disabled
              className="col-span-full"
            />
            <FormInput
              label="ราคาขาย (บาท) (เดิม)"
              defaultValue={stock.sellPrice}
              disabled
            />
            <FormInput
              label="ราคาขาย (บาท) (ที่ต้องการเปลี่ยน)"
              type="number"
              name="sellPrice"
              required
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
