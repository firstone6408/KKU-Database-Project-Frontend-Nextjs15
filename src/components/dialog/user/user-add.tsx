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
import { updateUser, UserType } from "@/server-actions/user";
import FormFile from "@/components/form/form-file";

export function UserAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState<boolean>(true);

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>รายละเอียดพนักงาน</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateUser} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="Username"
              name="username"
              type="text"
              required
            />
            <FormInput label="Email" name="email" type="text" required />
            <FormInput label="ชื่อ" name="name" type="text" required />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              type="number"
              required
            />
            <FormInput label="ตำแหน่ง" name="role" required />
            <FormInput
              label="Password"
              name="password"
              type="text"
              required
            />
            <FormFile
              label="รูปโปรไฟล์"
              name="profileImage"
              accept="image/*"
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
