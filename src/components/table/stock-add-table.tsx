/** @format */
"use client";

import { fetchProducts, ProductType } from "@/server-actions/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import ProductsDropdown from "../dropdown/products";
import { Input } from "../ui/input";
import { productUtils } from "@/utils/product.utils";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { tableUtils } from "@/utils/table.utils";

type StockAddTableProps = {
  stockInItems: StockItemType[];
  setStockInItems: React.Dispatch<React.SetStateAction<StockItemType[]>>;
};

export default function StockAddTable({
  stockInItems,
  setStockInItems,
}: StockAddTableProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const results = await fetchProducts();
      setProducts(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>รอสักครู่...</p>
      </div>
    );
  }

  const handleAddRow = () => {
    setStockInItems([
      ...stockInItems,
      { productId: "", quantity: 1, costPrice: 0 },
    ]);
  };

  const handleRemoveRow = (productId: string) => {
    setStockInItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
    console.log("id:", productId);
  };

  const handleUpdateStockInItems = (
    index: number,
    key: string,
    value: any
  ) => {
    const updatedProducts = [...stockInItems];
    updatedProducts[index] = { ...updatedProducts[index], [key]: value };
    setStockInItems(updatedProducts);
    console.log(updatedProducts);
  };

  const getAvailableProducts = (selectedProductId?: string) => {
    return products.filter(
      (product) =>
        product.id === selectedProductId || // แสดงสินค้าที่เลือกไว้แล้ว
        !stockInItems.some((item) => item.productId === product.id) // กรองสินค้าที่ถูกเลือกไปแล้ว
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px] text-end">ลำดับ</TableHead>
            <TableHead>
              ชื่อสินค้า (ประเภท | ชื่อ | ขนาด | รุ่น | หน่วย)
            </TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคาต้นทุน</TableHead>
            <TableHead className="text-center">ลบ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockInItems.length > 0
            ? stockInItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-end">{index + 1}</TableCell>
                  <TableCell>
                    {item.productId ? (
                      (function () {
                        const product = products.find(
                          (product) => product.id === item.productId
                        );
                        return product ? (
                          <div className="flex items-center gap-2">
                            <Image
                              src={urlConfig.showImage(product.image)}
                              alt={`img-${product.productCode}`}
                              width={50}
                              height={50}
                              className="rounded-lg border shadow"
                            />
                            <p className="text-green-700 font-semibold">
                              {productUtils.productNameFormatter(
                                {
                                  categoryName: product.category.name,
                                  name: product.name,
                                  model: product.model,
                                  size: product.size,
                                  unit: product.unit,
                                },
                                { isDash: true }
                              )}
                            </p>
                          </div>
                        ) : (
                          <p>ไม่พบสินค้า</p>
                        );
                      })()
                    ) : (
                      <ProductsDropdown
                        valuesProducts={getAvailableProducts(
                          item.productId
                        )}
                        onChange={(id) =>
                          handleUpdateStockInItems(index, "productId", id)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      onChange={(event) =>
                        handleUpdateStockInItems(
                          index,
                          "quantity",
                          event.target.value
                        )
                      }
                      placeholder="จำนวนสินค้า..."
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      onChange={(event) =>
                        handleUpdateStockInItems(
                          index,
                          "costPrice",
                          event.target.value
                        )
                      }
                      placeholder="ราคาต้นทุน(บาท)..."
                      required
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleRemoveRow(item.productId)}
                      variant={"destructive"}
                      type="button"
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : tableUtils.tableRowEmpty(5)}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} className="mt-3">
        <Plus /> เพิ่มสินค้า
      </Button>
    </>
  );
}
