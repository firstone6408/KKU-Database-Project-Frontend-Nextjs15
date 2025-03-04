/** @format */

import { StockStatusDropdown } from "@/components/dropdown/stock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function StockInHistorySearch() {
  return (
    <Card>
      <CardHeader className="font-semibold">
        ค้นหาสำหรับ ประวัติการนำเข้า
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-3 gap-5">
          <div className="flex justify-center items-center gap-2">
            <Label className="w-40">ค้นหารหัสนำเข้า</Label>
            <Input name="refCode" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label className="w-32">ค้นหาผู้วางจำหน่าย</Label>
            <Input name="distributor" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label className="w-32">ค้นหาสถาณะ</Label>
            <StockStatusDropdown className="w-full" name="isCanceled" />
          </div>

          <div className="col-span-full flex justify-evenly gap-5">
            <div className="flex justify-center items-center gap-2">
              <Label className="w-44">ค้นหาวันที่(เริ่ม)</Label>
              <Input name="startDate" type="date" />
            </div>
            <div className="flex justify-center items-center gap-2">
              <Label className="w-44">ค้นหาวันที่(สิ้นสุด)</Label>
              <Input name="endDate" type="date" />
            </div>
            <Button type="submit">
              <Search />
              ค้นหา
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
