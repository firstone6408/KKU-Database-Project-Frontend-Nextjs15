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
import { addProduct } from "@/server-actions/product";
import FormInput from "@/components/form/form-input";
import CategoryDropDown from "@/components/dropdown/category";
import FormTextArea from "@/components/form/form-textarea";
import FormFile from "@/components/form/form-file";
import FormButton from "@/components/form/form-button";

export function ProductAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>เพิ่มสินค้า</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={addProduct} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput label="รหัส" name="productCode" required />
            <CategoryDropDown
              label="หมวดหมู่"
              name="categoryId"
              required
            />
            <FormInput
              label="ชื่อ"
              name="name"
              required
              className="col-span-full"
            />
            <FormTextArea
              label="คำอธิบาย"
              name="description"
              className="col-span-full"
              rows={5}
            />
            <FormFile label="รูปภาพ" name="image" accept="image/*" />
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