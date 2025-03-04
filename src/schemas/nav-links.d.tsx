/** @format */

import { UserRole } from "@/configs/enum.config";
import {
  BadgeDollarSign,
  CarFront,
  ChartArea,
  ChartBarStacked,
  FileSliders,
  GitBranch,
  HandCoins,
  Home,
  IndentDecrease,
  IndentIncrease,
  Layers,
  LayoutDashboard,
  Proportions,
  ReceiptText,
  UserCog,
  Users,
} from "lucide-react";

export type NavLinkType = {
  type?: "hidden" | "show";
  title: string;
  href?: string;
  icon?: React.JSX.Element;
  permission?: UserRole[];
  subLinks?: {
    title: string;
    href: string;
    icon?: React.JSX.Element;
    permission?: UserRole[];
    type?: "hidden" | "show";
  }[];
};

// Menu items.
export const navLinks: NavLinkType[] = [
  {
    title: "หลัก",
    href: "/",
    icon: <Home />,
  },
  {
    title: "บิล",
    href: "/bill",
    icon: <BadgeDollarSign />,
    permission: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF],
  },
  {
    title: "ขนส่ง",
    href: "/delivery",
    icon: <CarFront />,
    permission: [
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.STAFF,
      UserRole.TRANSPORTER,
    ],
  },
  // {
  //   title: "ขาย",
  //   href: "/bill/sale",
  //   icon: <BadgeDollarSign />,
  //   type: "hidden",
  // },
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   icon: <ChartArea />,
  // },
  {
    title: "ลูกค้า",
    href: "/customer",
    icon: <Users />,
    permission: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF],
  },
  {
    title: "รายงาน",
    href: "/report",
    icon: <Proportions />,
    permission: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF],
  },
  {
    title: "Stock",
    icon: <Layers />,
    permission: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF],
    subLinks: [
      {
        title: "Stock ทั้งหมด",
        href: "/stock",
        icon: <ReceiptText />,
      },
      {
        title: "เพิ่มสินค้าเข้าStock",
        href: "/stock/add",
        icon: <ReceiptText />,
        permission: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF],
        type: "hidden",
      },
      {
        title: "Stock นำเข้า",
        href: "/stock/in-history",
        icon: <IndentIncrease />,
      },
      {
        title: "Stock นำออก",
        href: "/stock/out-history",
        icon: <IndentDecrease />,
      },
    ],
  },
  {
    title: "ผู้ใช้",
    href: "/user",
    icon: <UserCog />,
    permission: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    title: "Admin",
    icon: <FileSliders />,
    permission: [UserRole.ADMIN],
    subLinks: [
      {
        title: "สาขา",
        href: "/branch",
        icon: <GitBranch />,
        permission: [UserRole.ADMIN],
      },
      {
        title: "หมวดหมู่",
        href: "/category",
        icon: <ChartBarStacked />,
        permission: [UserRole.ADMIN],
      },
      {
        title: "กลุ่มลูกค้า",
        href: "/customer/group",
        icon: <Users />,
        permission: [UserRole.ADMIN],
      },
      {
        title: "สินค้า",
        href: "/product",
        icon: <LayoutDashboard />,
        permission: [UserRole.ADMIN],
      },
      {
        title: "วิธีการชำระเงิน",
        href: "/payment-method",
        icon: <HandCoins />,
        permission: [UserRole.ADMIN],
      },
    ],
  },
];
