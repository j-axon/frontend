import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Entry point for route protection and RBAC.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tickets/:path*", "/assets/:path*", "/admin/:path*", "/reports/:path*", "/(protected)/:path*"]
};
