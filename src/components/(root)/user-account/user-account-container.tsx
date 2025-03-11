/** @format */

import { UserUpdateDialog } from "@/components/dialog/user/user-update";
import FormInput from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urlConfig } from "@/configs/url.config";
import { fetchUserByUserId } from "@/server-actions/user";
import { userUtils } from "@/utils/user.utils";
import { Pen } from "lucide-react";
import Image from "next/image";

type UserAccountContainerProps = {
  userId: string;
};

export default async function UserAccountContainer({
  userId,
}: UserAccountContainerProps) {
  const user = await fetchUserByUserId(userId);

  if (!user) {
    return (
      <p className="text-red-600 text-xl font-semibold">
        -- ไม่พบรายการ --
      </p>
    );
  }
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">บัญชีผู้ใช้</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <section className="col-span-1 space-y-2">
            <CardTitle className="text-lg">รูปโปรไฟล์</CardTitle>
            <div className="flex justify-center items-center">
              {user.profileImage ? (
                <Image
                  src={urlConfig.showImage(user.profileImage)}
                  alt="profileImage"
                  width={150}
                  height={150}
                  className="rounded-full border shadow"
                />
              ) : (
                <p className="">-- ไม่มีรูปโปรไฟล์ --</p>
              )}
            </div>

            <UserUpdateDialog
              user={user}
              btn={
                <Button className="w-full" variant={"ghost"}>
                  <Pen /> แก้ไข
                </Button>
              }
            />
          </section>
          <section className="col-span-2 space-y-2">
            <CardTitle>ข้อมูลในบัญชี</CardTitle>
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="ชื่อผู้ใช้"
                defaultValue={user.username}
                disabled
              />
              <FormInput
                label="อีเมล์"
                defaultValue={user.email}
                disabled
              />
              <FormInput label="ชื่อ" defaultValue={user.name} disabled />
              <FormInput
                label="เบอร์"
                defaultValue={user.phoneNumber}
                disabled
              />
              <FormInput
                label="ตำแหน่ง"
                defaultValue={userUtils.userRoleFormatter(user.role)}
                disabled
              />
              <FormInput
                label="สถาณะ"
                defaultValue={userUtils.userStatusFormatter(user.status)}
                disabled
              />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
