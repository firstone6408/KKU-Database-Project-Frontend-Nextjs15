/** @format */

import { UserRole } from "@/configs/enum.config";
import {
  BadgeDollarSign,
  ChartArea,
  ChartBarStacked,
  FileSliders,
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
    title: "Sale",
    href: "/sale",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <ChartArea />,
  },
  {
    title: "Customer",
    href: "/customer",
    icon: <Users />,
  },
  {
    title: "Report",
    href: "/report",
    icon: <Proportions />,
  },
  {
    title: "Stock",
    icon: <Layers />,
    subLinks: [
      {
        title: "All",
        href: "/stock/in-history",
        icon: <ReceiptText />,
      },
      {
        title: "Stock In",
        href: "/stock/in-history",
        icon: <IndentIncrease />,
      },
      {
        title: "Stock Out",
        href: "/stock/out-history",
        icon: <IndentDecrease />,
      },
    ],
  },
  {
    title: "User",
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
        title: "Category",
        href: "/category",
        icon: <ChartBarStacked />,
        permission: [UserRole.ADMIN],
      },
      {
        title: "Product",
        href: "/product",
        icon: <LayoutDashboard />,
      },
    ],
  },
];
