/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <Card>
      <CardHeader className="font-bold text-center text-xl">
        Database Project
      </CardHeader>
      <CardDescription className="text-center">
        รายวิชา CP352003 Database Management System and Database Design
        Section 03
      </CardDescription>
      <CardContent>
        <section className="space-y-2">
          <CardTitle>สมาชิกในกลุ่ม</CardTitle>
          <ul>
            <li>นายเอกวิชญ์ พิลาวรรณ 663380619-8 Section 03</li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
