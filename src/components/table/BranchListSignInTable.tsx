/** @format */

import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { SignOutButton } from "../auth/sign-out-button";

export default function BranchListSignInTable() {
  return (
    <Card className="w-full max-w-[800px]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-extrabold">
          เลือกสาขาของคุณ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ชื่อสาขา</TableHead>
              <TableHead className="text-right">Sign in</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ขอนแก่น</TableCell>
              <TableCell className="text-right">
                <Button>เข้าสู่ระบบ</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex">
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
