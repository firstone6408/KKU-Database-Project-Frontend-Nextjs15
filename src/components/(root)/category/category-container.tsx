/** @format */

import CategoriesListTable from "@/components/table/category-list-table";
import { fetchCategories } from "@/server-actions/category";
import CategorySearch from "./category-search";
import { CategoryAddDialog } from "@/components/dialog/category/category-add";
import { Button } from "@/components/ui/button";

export default async function CategoryContainer() {
  const categories = await fetchCategories();
  return (
    <>
      <div className="flex justify-between items-center p-2">
        {/* <CategorySearch /> */}
        <div></div>
        <CategoryAddDialog btn={<Button>เพิ่ม</Button>} />
      </div>
      <CategoriesListTable categories={categories} />
    </>
  );
}
