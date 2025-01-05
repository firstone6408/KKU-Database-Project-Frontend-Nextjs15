/** @format */

import CategoryContainer from "@/components/(root)/category/category-container";
import TableLoadingSkeleton from "@/components/skeleton/customer-loading";
import { Suspense } from "react";

export default function CategoryPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <CategoryContainer />
    </Suspense>
  );
}
