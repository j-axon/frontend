import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * El middleware solo observa presencia de cookie de sesión para evitar parpadeo
 * de UI en SSR. La validación real se hace en cliente vía useCurrentUser
 * y en backend con JWT.
 *
 * Contrato:
 *  - El access token vive SOLO en memoria (tokenMemoryStore).
 *  - El refresh token viaja como cookie HttpOnly `jaxon_refresh_token`
 *    (configurable vía REFRESH_TOKEN_COOKIE_NAME en backend).
 *  - El middleware lee esa cookie y expone `x-jaxon-has-session: 1|0`
 *    para que server components / SSR puedan saltarse /auth/me cuando
 *    ya saben que no hay sesión.
 *  - Para visitantes sin sesión añade `x-jaxon-public: 1` (mantiene el
 *    contrato previo).
 *
 * Nota: `process.env.REFRESH_TOKEN_COOKIE_NAME` se lee inline porque
 * los helpers tipados de `@shared/lib/env` corren del lado del cliente y
 * el middleware se ejecuta en el edge runtime.
 */
const PUBLIC_PATHS = ["/", "/login", "/favicon.ico"];

const REFRESH_COOKIE_NAME =
  process.env.REFRESH_TOKEN_COOKIE_NAME || "jaxon_refresh_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(REFRESH_COOKIE_NAME));

  // Forward the header to the REQUEST so server components can read it
  // via `headers()` in the App Router. Without this, `headers().get("x-jaxon-has-session")`
  // in a server component returns null even though we set it on the response below.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-jaxon-has-session", hasSession ? "1" : "0");
  if (!hasSession) {
    requestHeaders.set("x-jaxon-public", "1");
  }

  if (!hasSession) {
    // No redirigimos: dejamos que el cliente muestre login (no rompe UX con SSR).
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};