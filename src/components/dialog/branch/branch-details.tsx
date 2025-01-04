/** @format */

"use client";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BranchType, updateBranchAction } from "@/server-actions/branch";
import { RemoveBranchButton } from "@/components/button/branch";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import { dayjsUtils } from "@/utils/date.utils";

export function BranchDetailsDialog(props: {
  btn: React.JSX.Element;
  branch: BranchType;
}) {
  const { btn, branch } = props;
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState<boolean>(true);

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>รายละเอียดสาขา</DialogTitle>
            <DialogDescription></DialogDescription>
            <RemoveBranchButton
              branchId={branch.id}
              btn={"ลบ"}
              name="id"
            />
          </div>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateBranchAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="id" defaultValue={branch.id} />
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput
              label="รหัส"
              name="branchCode"
              type="text"
              defaultValue={branch.branchCode}
              required
              disabled={isEdit}
            />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              type="text"
              defaultValue={branch.phoneNumber}
              required
              disabled={isEdit}
            />
            <FormInput
              label="ชื่อ"
              name="name"
              type="text"
              defaultValue={branch.name}
              required
              disabled={isEdit}
              className="col-span-full"
            />
            <FormTextArea
              label="ที่อยู่"
              name="address"
              defaultValue={branch.address}
              rows={5}
              required
              disabled={isEdit}
              className="col-span-full"
            />
            <FormInput
              label="วันที่สร้าง"
              defaultValue={dayjsUtils.autoFormat(branch.createdAt)}
              disabled
            />
            <FormInput
              label="แก้ไขล่าสุด"
              defaultValue={dayjsUtils.autoFormat(branch.updatedAt)}
              disabled
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={isEdit ? "default" : "destructive"}
              onClick={() => onClickEdit()}
            >
              {isEdit ? "แก้ไข" : "ยกเลิก"}
            </Button>
            {!isEdit && <Button type="submit">บันทึก</Button>}
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
