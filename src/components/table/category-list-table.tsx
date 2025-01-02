/** @format */

import { CategoryType } from "@/server-actions/category";
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
import { CategoryDetailsDialog } from "../dialog/category/category-details";
import { Eye } from "lucide-react";
import { RemoveCategoryButton } from "../button/category";

export default function CategoriesListTable(props: {
  categories: CategoryType[];
}) {
  const { categories } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>หมวดหมู่ทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัส</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 &&
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.categoryCode}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-center">
                    <CategoryDetailsDialog
                      category={category}
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
