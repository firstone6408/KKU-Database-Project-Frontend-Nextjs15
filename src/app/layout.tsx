/** @format */

import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "@/styles/globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";

const baiJamjuree = Bai_Jamjuree({
  weight: "400",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Point of sale",
  description: "Point of sale for everythings",
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${baiJamjuree.className} antialiased`}>
        <Provider>
          <main>{children}</main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
