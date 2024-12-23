/** @format */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function BranchSignInPage() {
  return (
    <section className="h-screen flex justify-center items-center">
      <Card className="w-[800px]">
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
                <TableHead className="text-right">Amount</TableHead>
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
      </Card>
    </section>
  );
}
