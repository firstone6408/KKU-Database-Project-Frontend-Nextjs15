/** @format */

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { UserType } from "@/server-actions/user";
import { Button } from "../ui/button";
import { Eye, Pen } from "lucide-react";
import { dayjsUtils } from "@/utils/date.utils";
import { UserStatus } from "@/configs/enum.config";
import { UserDetailsDialog } from "../dialog/user/user-details";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { userUtils } from "@/utils/user.utils";
import { tableUtils } from "@/utils/table.utils";
import { UserUpdateDialog } from "../dialog/user/user-update";

export default function UsersListTable(props: { users: UserType[] }) {
  const { users } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>ผู้ใช้ทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[100px] text-center">
                รูปโปรไฟล์
              </TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px] text-center">
                สถาณะ
              </TableHead>
              <TableHead className="w-[100px] text-center">
                ตำแหน่ง
              </TableHead>
              <TableHead className="w-[100px]">เข้าใช้งานล่าสุด</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0
              ? users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell className="flex justify-center items-center">
                      {user.profileImage ? (
                        <Image
                          src={urlConfig.showImage(user.profileImage)}
                          alt={`profileImage-${index}`}
                          width={40}
                          height={40}
                          className="object-none w-[40px] h-[40px] rounded-full"
                        />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell
                      className={`font-semibold text-center ${
                        user.status === UserStatus.ACTIVE
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {userUtils.userStatusFormatter(user.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      {userUtils.userRoleFormatter(user.role)}
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? (
                        dayjsUtils.autoFormat(user.lastLogin)
                      ) : (
                        <>ยังไม่ได้เข้าใช้งาน</>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-2">
                      <UserUpdateDialog
                        user={user}
                        btn={
                          <Button variant={"outline"}>
                            <Pen />
                          </Button>
                        }
                      />
                      <UserDetailsDialog
                        user={user}
                        btn={
                          <Button>
                            <Eye />
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(0)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
