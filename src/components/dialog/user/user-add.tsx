/** @format */

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
import FormInput from "../../form/form-input";
import { addUserAction } from "@/server-actions/user";
import FormFile from "@/components/form/form-file";
import UserRoleDropDown from "@/components/dropdown/user-role";

export function UserAddDialog(props: { btn: React.JSX.Element }) {
  const { btn } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้ใช้</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={addUserAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="Username"
              name="username"
              type="text"
              required
            />
            <FormInput label="Email" name="email" type="email" required />
            <FormInput label="ชื่อ" name="name" type="text" required />
            <FormInput label="เบอร์" name="phoneNumber" type="number" />
            <UserRoleDropDown
              label="ตำแหน่ง"
              name="role"
              placeholder="-- เลือกตำแหน่ง --"
              required
            />
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
            <Button type="submit">บันทึก</Button>
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
