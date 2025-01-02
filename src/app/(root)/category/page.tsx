/** @format */

import CategoryContainer from "@/components/(root)/category/category-container";
import CustomerLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function CategoryPage() {
  return (
    <Suspense fallback={<CustomerLoadingSkeleton />}>
      <CategoryContainer />
    </Suspense>
  );
}
