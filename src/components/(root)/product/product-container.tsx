/** @format */

import ProductsListTable from "@/components/table/product-list-table";
import { fetchProducts } from "@/server-actions/product";
import ProductSearch from "./product-search";
import { ProductAddDialog } from "@/components/dialog/product/product-add";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ProductContainer() {
  const products = await fetchProducts();

  //console.log(products);

  return (
    <>
      <div className="flex justify-between items-center p-2">
        <ProductSearch />
        <ProductAddDialog
          btn={
            <Button>
              <Plus />
              <p>เพิ่มสินค้า</p>
            </Button>
          }
        />
      </div>
      <ProductsListTable products={products} />
    </>
  );
}
