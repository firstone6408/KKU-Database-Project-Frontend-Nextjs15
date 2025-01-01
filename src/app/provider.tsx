/** @format */

import { ThemeProvider } from "@/components/provider/theme-provider";
import { SessionProvider } from "@/components/provider/session-provider";
import { getServerSession } from "next-auth";

type ProviderProps = {
  children: React.ReactNode;
};

export default async function Provider({ children }: ProviderProps) {
  const session = await getServerSession();
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
