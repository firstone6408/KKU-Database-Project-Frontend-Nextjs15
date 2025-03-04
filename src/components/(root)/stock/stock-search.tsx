/** @format */

import CategoryDropDown from "@/components/dropdown/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function StockSearch() {
  return (
    <form className="flex justify-center items-center gap-5">
      <div className="flex justify-center items-center gap-2">
        <Label className="w-40">ค้นหารหัสสินค้า</Label>
        <Input name="productCode" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Label className="w-full">ค้นหากลุ่มลูกค้า</Label>
        <CategoryDropDown className="w-full" name="categoryId" />
      </div>
      <Button type="submit">
        <Search />
        ค้นหา
      </Button>
    </form>
  );
}
