/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LoginForm } from "@/components/form/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  //console.log(session);

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <LoginForm />
    </section>
  );
}
