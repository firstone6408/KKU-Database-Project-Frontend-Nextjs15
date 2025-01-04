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
import { addBranchAction } from "@/server-actions/branch";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import FormButton from "@/components/form/form-button";

export function BranchAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;
  const pathname = usePathname();

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>เพิ่มสาขา</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>
        {/* content */}
        <FormContainer action={addBranchAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput
              label="รหัส"
              name="branchCode"
              type="text"
              required
            />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              type="text"
              required
            />
            <FormInput
              label="ชื่อ"
              name="name"
              type="text"
              required
              className="col-span-full"
            />
            <FormTextArea
              label="ที่อยู่"
              name="address"
              rows={5}
              required
              className="col-span-full"
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
