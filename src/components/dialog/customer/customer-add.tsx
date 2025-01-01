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
import { addCustomerAction } from "@/server-actions/customer";
import FormContainer from "../../form/form-container";
import FormInput from "../../form/form-input";
import CustomerGroupsDropdown from "../../dropdown/customer-group";
import FormButton from "../../form/form-button";
import FormTextArea from "@/components/form/form-textarea";

export function CustomerAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{btn}</DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>รายละเอียดลูกค้า</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FormContainer action={addCustomerAction} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="รหัสลูกค้า"
                name="customerCode"
                type="text"
                required
              />
              <CustomerGroupsDropdown
                label="กลุ่ม"
                name="customerGroupId"
                placeholder="-- เลือก --"
                required
              />
              <FormInput label="ชื่อ" name="name" type="text" required />
              <FormInput
                label="เบอร์"
                name="phoneNumber"
                type="number"
                required
              />
              <FormTextArea
                label="ที่อยู่"
                name="address"
                className="col-span-full"
                rows={5}
              />
            </div>
            <DialogFooter>
              <FormButton btnText="บันทึก" />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
