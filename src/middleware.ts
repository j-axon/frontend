import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * El middleware solo observa presencia de cookie de sesión para evitar parpadeo
 * de UI en SSR. La validación real se hace en cliente vía useCurrentUser
 * y en backend con JWT.
 */
const PUBLIC_PATHS = ["/", "/login", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get("ACCESS_TOKEN_COOKIE") || request.cookies.get("jaxon_session"));
  if (!hasSession) {
    // No redirigimos: dejamos que el cliente muestre login (no rompe UX con SSR).
    const res = NextResponse.next();
    res.headers.set("x-jaxon-public", "1");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
