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
import { StockProductType } from "@/server-actions/stock";
import { updatePriceAction } from "@/server-actions/product-sale-branch";
import { dayjsUtils } from "@/utils/date.utils";

export function AdjustPriceDialog(props: {
  btn: any;
  stockProduct: StockProductType;
}) {
  const { btn, stockProduct: product } = props;
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
              defaultValue={product.id}
            />
            <FormInput
              label="รหัส"
              defaultValue={product.productCode}
              disabled
            />
            <FormInput
              label="หมวดหมู่"
              defaultValue={product.category.name}
              disabled
            />
            <FormInput
              label="ชื่อ"
              defaultValue={product.name}
              disabled
              className="col-span-full"
            />
            <FormInput
              label="วันที่เริ่ม"
              defaultValue={
                product.ProductSaleBranch.length > 0
                  ? dayjsUtils.autoFormat(
                      product.ProductSaleBranch[0].createdAt
                    )
                  : "ยังไม่ได้กำหนดราคา"
              }
              disabled
              className="col-span-1"
            />
            <FormInput
              label="วันที่แก้ไขล่าสุด"
              defaultValue={
                product.ProductSaleBranch.length > 0
                  ? dayjsUtils.autoFormat(
                      product.ProductSaleBranch[0].updatedAt
                    )
                  : "ยังไม่ได้กำหนดราคา"
              }
              disabled
              className="col-span-1"
            />
            <FormInput
              label="ราคาขาย (บาท) (เดิม)"
              defaultValue={
                product.ProductSaleBranch.length > 0
                  ? product.ProductSaleBranch[0].sellPrice
                  : "ยังไม่ได้กำหนดราคา"
              }
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
