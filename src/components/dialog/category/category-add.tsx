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
import { addCategoryAction } from "@/server-actions/category";
import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

export function CategoryAddDialog(props: { btn: any }) {
  const { btn } = props;
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>เพิ่มหมวดหมู่</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={addCategoryAction} className="space-y-2">
          <input type="hidden" name="pathname" defaultValue={pathname} />
          <FormInput label="รหัส" name="categoryCode" required />
          <FormInput label="ชื่อ" name="name" required />
          <DialogFooter>
            <FormButton btnText="บันทึก" />
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
