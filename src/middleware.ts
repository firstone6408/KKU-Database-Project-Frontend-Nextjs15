/** @format */

import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { checkUserRoleInNavLink } from "./utils/role.utils";

export async function middleware(request: NextRequest) {
  // get token
  const user = (await getToken({ req: request })) as
    | Session["user"]
    | null;

  // get current path
  const currentUrl = request.nextUrl.pathname;

  // chech authen
  if (!user) {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  // check permission
  const hasPermission = checkUserRoleInNavLink(currentUrl, user);

  if (hasPermission !== null && hasPermission === false) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // ไม่ให้เข้าหน้า about จะถูก redirect กลับมาหน้าแรก
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
