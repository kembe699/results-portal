import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE_NAME = "admin_auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow Next internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next()
  }

  // Allow the admin login page itself without auth
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Protect other /admin routes
  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME)

    if (!cookie) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
