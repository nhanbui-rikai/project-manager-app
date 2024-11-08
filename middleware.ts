import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptData } from "./lib/utils";

export function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("userAuth");
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  if (token) {
    const decodeData = decryptData(token.value);
    if (!decodeData.isLogin) return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/project", "/project/:id*", "/user/:id*", "/password", "/profile"],
};
