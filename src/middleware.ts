import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protección de rutas de admin - solo usuarios con rol ADMIN pueden acceder
  if (pathname.startsWith("/admin")) {
    const userRole = request.cookies.get("user_role")?.value;
    
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  // Protección de rutas de técnico - solo usuarios con rol TECHNICIAN o ADMIN pueden acceder
  if (pathname.startsWith("/technician")) {
    const userRole = request.cookies.get("user_role")?.value;
    
    if (userRole !== "TECHNICIAN" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tickets/:path*", "/assets/:path*", "/admin/:path*", "/reports/:path*", "/(protected)/:path*"]
};
