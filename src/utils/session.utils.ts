/** @format */
/** @format */

"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthenticate, You must logged");
  }
  return session;
}
