/** @format */

import ProductContainer from "@/components/(root)/product/product-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <ProductContainer />
    </Suspense>
  );
}
