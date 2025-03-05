/** @format */

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { BranchType } from "@/server-actions/branch";
import { Eye } from "lucide-react";
import { BranchDetailsDialog } from "../dialog/branch/branch-details";
import { tableUtils } from "@/utils/table.utils";

export default async function BranchListTable(props: {
  branches: BranchType[];
}) {
  const { branches } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>สาขาทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัส</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">เบอร์</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.length > 0
              ? branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>{branch.branchCode}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.phoneNumber}</TableCell>
                    <TableCell className="text-center">
                      <BranchDetailsDialog
                        branch={branch}
                        btn={
                          <Button>
                            <Eye />
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(4)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
