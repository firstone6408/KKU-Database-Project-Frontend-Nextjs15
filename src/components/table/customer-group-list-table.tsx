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
import { Pen } from "lucide-react";
import { CustomerGroupType } from "@/server-actions/customer";
import { dayjsUtils } from "@/utils/date.utils";
import { CreateOrUpdateCustomerGroupDialog } from "../dialog/customer-group/create-or-update-group";
import { tableUtils } from "@/utils/table.utils";

export default function CustomerGroupListTable(props: {
  customerGroups: CustomerGroupType[];
}) {
  const { customerGroups } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>กลุ่มลูกค้าทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] text-end">ลำดับ</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">วันที่สร้าง</TableHead>
              <TableHead className="w-[100px]">วันที่แก้ไข</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerGroups.length > 0
              ? customerGroups.map((customerGroup, index) => (
                  <TableRow key={customerGroup.id}>
                    <TableCell className="text-end">{index + 1}</TableCell>
                    <TableCell>{customerGroup.name}</TableCell>
                    <TableCell>
                      {dayjsUtils.autoFormat(customerGroup.createdAt)}
                    </TableCell>
                    <TableCell>
                      {dayjsUtils.autoFormat(customerGroup.updatedAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      <CreateOrUpdateCustomerGroupDialog
                        customerGroup={customerGroup}
                        btn={
                          <Button>
                            <Pen />
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(5)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
