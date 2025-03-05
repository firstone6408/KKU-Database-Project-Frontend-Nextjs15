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

export default async function BranchListSignInTable(props: {
  branches: BranchType[];
}) {
  const { branches } = props;

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
      <CardFooter className="flex">
        <SignOutButton />
      </CardFooter>
    </Card>
  );
}
