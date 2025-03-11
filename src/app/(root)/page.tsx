/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MemberType = {
  id: string;
  name: string;
  section: number;
};

const members: MemberType[] = [
  {
    id: "663380619-8",
    name: "นายเอกวิชญ์ พิลาวรรณ",
    section: 2,
  },
  {
    id: "663380379-2",
    name: "นายญานวิทย์ พิชญกุลมงคล",
    section: 2,
  },
  {
    id: "663380383-1 ",
    name: "นายณัฐภัทร วรจินดา",
    section: 2,
  },
  {
    id: "663380391-2",
    name: "นายพงศ์วิรัญจ์ จันทะฟอง",
    section: 2,
  },
];

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
      <CardContent className="flex justify-center py-5">
        <section className="space-y-2">
          <CardTitle className="text-center">สมาชิกในกลุ่ม</CardTitle>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {member.name} Section {member.section}
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
