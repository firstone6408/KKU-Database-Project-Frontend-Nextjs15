/** @format */

import CustomerGroupsDropdown from "@/components/dropdown/customer-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function CustomerSearch() {
  return (
    <form className="flex justify-center items-center gap-5">
      <div className="flex justify-center items-center gap-2">
        <Label className="w-40">ค้นหารหัสลูกค้า</Label>
        <Input name="customerCode" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Label className="w-32">ค้นหาชื่อลูกค้า</Label>
        <Input name="name" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Label>ค้นหากลุ่มลูกค้า</Label>
        <CustomerGroupsDropdown className="s" name="customerGroupId" />
      </div>
      <Button type="submit">
        <Search />
        ค้นหา
      </Button>
    </form>
  );
}
