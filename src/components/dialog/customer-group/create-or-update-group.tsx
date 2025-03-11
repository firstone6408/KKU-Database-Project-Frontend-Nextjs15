/** @format */

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
import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";
import {
  createOrUpdateCustomerGroup,
  CustomerGroupType,
} from "@/server-actions/customer";

export function CreateOrUpdateCustomerGroupDialog(props: {
  btn: any;
  customerGroup?: CustomerGroupType;
}) {
  const { btn, customerGroup } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>เพิ่มกลุ่มลูกค้า</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer
          action={createOrUpdateCustomerGroup}
          className="space-y-2"
        >
          {customerGroup ? (
            <>
              <input
                type="hidden"
                name="id"
                defaultValue={customerGroup.id}
                required
              />
              <FormInput
                label="ชื่อ"
                name="name"
                defaultValue={customerGroup.name}
              />
            </>
          ) : (
            <FormInput label="ชื่อ" name="name" required />
          )}

          <DialogFooter>
            <FormButton btnText="บันทึก" />
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
