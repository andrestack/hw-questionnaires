import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Local development — no subdomain rewriting needed
  if (hostname.includes("localhost")) {
    return NextResponse.next();
  }

  // Subdomain routing
  if (hostname === "start.hinterlandweb.com") {
    if (url.pathname === "/") {
      url.pathname = "/start";
      return NextResponse.rewrite(url);
    }
  }

  if (hostname === "audit.hinterlandweb.com") {
    if (url.pathname === "/") {
      url.pathname = "/audit";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
