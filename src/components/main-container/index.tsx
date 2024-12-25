/** @format */

import { Card } from "../ui/card";

type MainContainerProps = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <section className="container-custom h-full">
      <main className="bg-zinc-50 dark:bg-zinc-900 rounded-md border shadow p-5">
        {children}
      </main>
    </section>
  );
}
