/** @format */

import {
  ChartArea,
  FileClock,
  IndentDecrease,
  IndentIncrease,
  Layers,
  LayoutDashboard,
  ReceiptText,
  UserCog,
} from "lucide-react";

export type NavLinkSchema = {
  title: string;
  href?: string;
  icon?: React.JSX.Element;
  subLinks?: {
    title: string;
    href: string;
    icon?: React.JSX.Element;
  }[];
};

// Menu items.
export const navLinks: NavLinkSchema[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <ChartArea />,
  },
  {
    title: "Product",
    href: "/product",
    icon: <LayoutDashboard />,
  },
  {
    title: "User",
    href: "/user",
    icon: <UserCog />,
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
];
