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
import { Eye } from "lucide-react";
import { dayjsUtils } from "@/utils/date.utils";
import { UserStatus } from "@/configs/enum.config";
import { UserDetailsDialog } from "../dialog/user/user-details";

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
              <TableHead className="w-[100px]">ลำดับ</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">สถาณะ</TableHead>
              <TableHead className="w-[100px]">ตำแหน่ง</TableHead>
              <TableHead className="w-[100px]">เข้าใช้งานล่าสุด</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 &&
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      user.status === UserStatus.ACTIVE
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      dayjsUtils.autoFormat(user.lastLogin)
                    ) : (
                      <>ยังไม่ได้เข้าใช้งาน</>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
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
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
