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

type StockAddTableProps = {
  stockInItems: StockItemType[];
  setStockInItems: (params: StockItemType[]) => void;
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
    // console.log("productId:", productId);
    setStockInItems(
      stockInItems.filter((item) => item.productId !== productId)
    );
  };

  const handleUpdateStockInItems = (
    index: number,
    key: string,
    value: any
  ) => {
    const updatedProducts = [...stockInItems];
    updatedProducts[index] = { ...updatedProducts[index], [key]: value };
    setStockInItems(updatedProducts);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อสินค้า</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคาต้นทุน</TableHead>
            <TableHead className="text-center">ลบ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockInItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <ProductsDropdown
                  valuesProducts={products}
                  onChange={(id) =>
                    handleUpdateStockInItems(index, "productId", id)
                  }
                />
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
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} className="mt-3">
        <Plus /> เพิ่มสินค้า
      </Button>
    </>
  );
}
