/** @format */

import { ThemeToggle } from "../dropdown/theme-toggle";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="p-2 flex items-center justify-between">
      <SidebarTrigger />
      <ThemeToggle />
    </header>
  );
}
