/** @format */

import { ProductType } from "@/server-actions/product";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductDetailsDialog } from "../dialog/product/product-details";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { tableUtils } from "@/utils/table.utils";

export default function ProductsListTable({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>สินค้าทั้งหมด</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัส</TableHead>
              <TableHead className="w-[100px]">หมวดหมู่</TableHead>
              <TableHead className="w-[100px]">รูป</TableHead>
              <TableHead className="w-[100px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">รุ่น</TableHead>
              <TableHead className="w-[100px]">ขนาด</TableHead>
              <TableHead className="w-[100px]">สถาณะ</TableHead>
              <TableHead className="w-[100px] text-center">
                จัดการ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0
              ? products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      {product.image && (
                        <Image
                          src={urlConfig.showImage(product.image)}
                          width={60}
                          height={60}
                          className="object-cover rounded-xl border p-1"
                          alt=""
                        />
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell
                      className={`${
                        product.isDeleted
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.isDeleted ? "ถูกลบ" : "ปกติ"}
                    </TableCell>
                    <TableCell className="text-center">
                      <ProductDetailsDialog
                        product={product}
                        btn={
                          <Button>
                            <Eye />
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              : tableUtils.tableRowEmpty(6)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
