import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Portal routes require authentication (check via cookie)
  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login")) {
    const authCookie = request.cookies.get("auth-token");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  // Admin routes require admin role
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("auth-token");
    const roleCookie = request.cookies.get("user-role");
    if (!authCookie || roleCookie?.value !== "admin") {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
