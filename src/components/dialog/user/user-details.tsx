/** @format */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../../form/form-container";
import FormInput from "../../form/form-input";
import { dayjsUtils } from "@/utils/date.utils";
import { UserType } from "@/server-actions/user";
import UserStatusDropdown from "@/components/dropdown/user";
import UserRoleDropDown from "@/components/dropdown/user-role";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { Label } from "@/components/ui/label";
import { userUtils } from "@/utils/user.utils";

export function UserDetailsDialog(props: {
  btn: React.JSX.Element;
  user: UserType;
}) {
  const { btn, user } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>รายละเอียดผู้ใช้</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="Username"
              name="username"
              defaultValue={user.username}
              disabled
            />
            <FormInput
              label="Email"
              name="email"
              defaultValue={user.email}
              disabled
            />
            <FormInput
              label="ชื่อ"
              name="name"
              defaultValue={user.name}
              disabled
            />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
              disabled
            />
            <FormInput
              label="ตำแหน่ง"
              name="role"
              defaultValue={userUtils.userRoleFormatter(user.role)}
              disabled
            />

            <FormInput
              label="สถานะ"
              name="status"
              defaultValue={userUtils.userStatusFormatter(user.status)}
              disabled
            />

            <div className="col-span-1 space-y-2">
              <Label>รูปโปรไฟล์</Label>
              <div className="flex justify-center items-center">
                {user.profileImage ? (
                  <Image
                    src={urlConfig.showImage(user.profileImage)}
                    width={50}
                    height={50}
                    alt="user-profile"
                  />
                ) : (
                  <p>-- ไม่มีรูปโปรไฟล์ --</p>
                )}
              </div>
            </div>
            <FormInput
              className="col-span-1"
              label="เข้าใช้งานล่าสุด"
              defaultValue={
                user.lastLogin
                  ? dayjsUtils.autoFormat(user.lastLogin)
                  : "ยังไม่ได้เข้าใช้งาน"
              }
              disabled
            />
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
