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
import { BranchType } from "@/server-actions/branch";
import { BranchSignInButton } from "../button/branch";
import { tableUtils } from "@/utils/table.utils";
import { BranchAddDialog } from "../dialog/branch/branch-add";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
import { UserRole } from "@/configs/enum.config";

export default async function BranchListSignInTable(props: {
  branches: BranchType[];
  session: Session;
}) {
  const { branches, session } = props;

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
            {branches.length > 0
              ? branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">
                      {branch.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild>
                        <BranchSignInButton branchId={branch.id} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(2)}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex gap-2">
        {session.user.role === UserRole.ADMIN && (
          <BranchAddDialog
            btn={
              <Button>
                <Plus /> เพิ่มสาขา
              </Button>
            }
          />
        )}
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
