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
import FormInput from "../../form/form-input";
import { usePathname } from "next/navigation";
import { updateUserAction, UserType } from "@/server-actions/user";
import UserStatusDropdown from "@/components/dropdown/user";
import UserRoleDropDown from "@/components/dropdown/user-role";
import FormFile from "@/components/form/form-file";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { UserRole } from "@/configs/enum.config";

export function UserUpdateDialog(props: {
  btn: React.JSX.Element;
  user: UserType;
}) {
  const { btn, user } = props;
  const pathname = usePathname();
  const { data: session } = useSession();

  const isPermission =
    (session && session.user.role === UserRole.ADMIN) ||
    (session && session.user.role === UserRole.MANAGER);

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลผู้ใช้</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateUserAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="userId" defaultValue={user.id} />
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput
              label="Username"
              name="username"
              defaultValue={user.username}
            />
            <FormInput
              label="Email"
              name="email"
              defaultValue={user.email}
            />
            <FormInput label="ชื่อ" name="name" defaultValue={user.name} />
            <FormInput
              label="เบอร์"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
            />
            {isPermission && (
              <>
                <UserRoleDropDown
                  label="ตำแหน่ง"
                  name="role"
                  defaultValue={user.role}
                />
                <UserStatusDropdown
                  label="สถานะ"
                  name="status"
                  defaultValue={user.status}
                />
              </>
            )}

            <FormInput
              className="col-span-full"
              label="password"
              name="password"
            />
            <FormFile
              className="col-span-full"
              label="รูปโปรไฟล์"
              name="profileImage"
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
