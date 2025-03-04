/** @format */

import DeliveryTypeDropdown from "@/components/dropdown/delivery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/configs/enum.config";
import { Search } from "lucide-react";
import { Session } from "next-auth";

type DeliverySearchProps = {
  session: Session;
};

export default function DeliverySearch({ session }: DeliverySearchProps) {
  return (
    <Card>
      <CardHeader className="font-semibold">ค้นหาสำหรับขนส่ง</CardHeader>
      <CardContent>
        <form className="grid grid-cols-3 gap-5">
          <div className="col-span-2 flex justify-center items-center gap-2">
            <Label className="w-48">ค้นหาหมายเลขติดตาม</Label>
            <Input name="trackNumber" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Label className="w-32">ค้นหาประเภท</Label>
            <DeliveryTypeDropdown className="w-full" name="type" />
          </div>
          <div className="col-span-full flex justify-evenly gap-5">
            <div className="flex justify-center items-center gap-2 w-full">
              <Label className="w-44">ระยะทาง(เริ่ม)</Label>
              <Input name="distStart" type="number" />
            </div>
            <div className="flex justify-center items-center gap-2 w-full">
              <Label className="w-44">ระยะทาง(สิ้นสุด)</Label>
              <Input name="distEnd" type="number" />
            </div>
          </div>

          <div className="col-span-full flex justify-evenly gap-5">
            <div className="flex justify-center items-center gap-2 w-full">
              <Label className="w-44">ค้นหาวันที่(เริ่ม)</Label>
              <Input name="startDate" type="date" />
            </div>
            <div className="flex justify-center items-center gap-2 w-full">
              <Label className="w-44">ค้นหาวันที่(สิ้นสุด)</Label>
              <Input name="endDate" type="date" />
            </div>
            {session.user.role === UserRole.TRANSPORTER && (
              <div className="flex justify-center items-center gap-2 ">
                <Label className="w-12">
                  <span className="w-20">ค้นหาฉัน</span>
                </Label>
                <Input className="w-4" name="isMe" type="checkbox" />
              </div>
            )}
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
