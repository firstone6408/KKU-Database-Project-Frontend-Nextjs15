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
import {
  CustomerType,
  updateCustomerAction,
} from "@/server-actions/customer";
import FormContainer from "../../form/form-container";
import FormInput from "../../form/form-input";
import { dayjsUtils } from "@/utils/date.utils";
import FormTextArea from "../../form/form-textarea";
import { useState } from "react";
import CustomerGroupsDropdown from "../../dropdown/customer-group";
import FormButton from "../../form/form-button";
import { usePathname } from "next/navigation";
import { updateUserAction, UserType } from "@/server-actions/user";

export function UserDetailsDialog(props: {
  btn: React.JSX.Element;
  user: UserType;
}) {
  const { btn, user } = props;
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
          <DialogTitle>รายละเอียดพนักงาน</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateUserAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="Username"
              defaultValue={user.username}
              disabled
            />
            <FormInput label="Email" defaultValue={user.email} disabled />
            <FormInput label="ชื่อ" defaultValue={user.name} disabled />
            <FormInput
              label="เบอร์"
              defaultValue={user.phoneNumber}
              disabled
            />
            <FormInput label="ตำแหน่ง" defaultValue={user.role} disabled />
            <FormInput label="สถานะ" defaultValue={user.status} disabled />
            <FormInput
              className="col-span-full"
              label="เข้าใช้งานล่าสุด"
              defaultValue={
                user.lastLogin
                  ? dayjsUtils.autoFormat(user.lastLogin)
                  : "ยังไม่ได้เข้าใช้งาน"
              }
              disabled
            />
          </div>
          <DialogFooter>
            <Button type="button">แก้ไข</Button>
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
