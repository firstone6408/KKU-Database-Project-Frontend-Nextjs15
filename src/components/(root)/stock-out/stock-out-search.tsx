/** @format */

import {
  OrderStatusDropdown,
  OrderTypeDropdown,
} from "@/components/dropdown/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export function StockOutSearch() {
  return (
    <Card>
      <CardHeader className="font-semibold">
        ค้นหาสำหรับ ประวัตินำออก
      </CardHeader>
      <CardContent>
        <form className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-2">
            <Label className="w-44">ค้นหารหัสใบสั่งซื้อ</Label>
            <Input name="orderCode" />
          </div>

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
        </form>
      </CardContent>
    </Card>
  );
}
