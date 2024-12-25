/** @format */

import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("Hello middleware");

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
