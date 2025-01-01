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

export function CustomerDetailsDialog(props: {
  btn: React.JSX.Element;
  customer: CustomerType;
}) {
  const { btn, customer } = props;
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
          <DialogTitle>รายละเอียดลูกค้า</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormContainer action={updateCustomerAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="id" value={customer.id} />
            <input type="hidden" name="pathname" value={pathname} />
            <FormInput
              label="รหัสลูกค้า"
              disabled
              defaultValue={customer.customerCode}
            />
            <CustomerGroupsDropdown
              label="กลุ่ม"
              name="customerGroupId"
              disabled={isEdit}
              defaultValue={customer.customerGroup?.id}
            />
            <FormInput
              label="ชื่อ"
              name="name"
              type="text"
              disabled={isEdit}
              defaultValue={customer.name}
            />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              type="text"
              disabled={isEdit}
              defaultValue={customer.phoneNumber ?? ""}
            />
            <FormTextArea
              label="ที่อยู่"
              name="address"
              disabled={isEdit}
              defaultValue={customer.address ?? ""}
              className="col-span-full"
            />
            <FormInput
              label="ผู้สร้าง"
              disabled
              defaultValue={customer.user?.name}
              className="col-span-full"
            />
            <FormInput
              label="วันที่สร้าง"
              disabled
              defaultValue={dayjsUtils.autoFormat(customer.createdAt)}
            />
            <FormInput
              label="วันที่แก้ไขล่าสุด"
              disabled
              defaultValue={dayjsUtils.autoFormat(customer.updatedAt)}
            />
          </div>
          <DialogFooter>
            {!isEdit ? (
              <>
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => onClickEdit()}
                >
                  ยกเลิก
                </Button>
                <FormButton btnText="บันทึก" />
              </>
            ) : (
              <>
                <Button type="button" onClick={() => onClickEdit()}>
                  แก้ไข
                </Button>
              </>
            )}
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}
