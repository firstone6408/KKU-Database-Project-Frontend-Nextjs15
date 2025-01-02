/** @format */

import ProductsListTable from "@/components/table/product-list-table";
import { fetchProducts } from "@/server-actions/product";

export default async function ProductContainer() {
  const products = await fetchProducts();

  //console.log(products);

  return (
    <>
      <ProductsListTable products={products} />
    </>
  );
}
