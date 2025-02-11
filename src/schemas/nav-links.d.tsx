/** @format */

import { UserRole } from "@/configs/enum.config";
import {
  BadgeDollarSign,
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
    title: "ขาย",
    href: "/sale",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <ChartArea />,
  },
  {
    title: "ลูกค้า",
    href: "/customer",
    icon: <Users />,
  },
  {
    title: "รายงาน",
    href: "/report",
    icon: <Proportions />,
  },
  {
    title: "Stock",
    icon: <Layers />,
    subLinks: [
      {
        title: "Stock ทั้งหมด",
        href: "/stock",
        icon: <ReceiptText />,
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
