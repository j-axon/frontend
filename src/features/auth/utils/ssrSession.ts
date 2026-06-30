import { headers } from "next/headers";

/**
 * Estado de sesión observado por el middleware y expuesto vía request headers.
 *
 * El middleware (src/middleware.ts) setea `x-jaxon-has-session: 1|0` en el
 * REQUEST (no solo en el response) reenviando los headers vía
 * `NextResponse.next({ request: { headers } })`. Esto permite que cualquier
 * server component del App Router lo lea con `headers()`.
 *
 * Usos típicos en server components:
 *   - Saltarse la llamada `/auth/me` cuando `hasSession === false`
 *     (ahorra un 401 spuriory un flash de UI).
 *   - Decidir si renderizar contenido gated por rol (aunque la fuente
 *     de verdad sigue siendo el backend en cada request).
 *   - Logging/observabilidad: registrar SSR renders sin sesión.
 *
 * Limitaciones:
 *   - Esta señal es probabilística (la cookie podría ser falsa o estar
 *     revocada). El backend sigue siendo la fuente real de autorización.
 *   - Solo funciona dentro de server components / layouts / pages que
 *     se ejecutan en el request scope del middleware.
 */
export type SsrSessionState = {
  /** El middleware vio una cookie `jaxon_refresh_token` válida (mismo nombre que usa el backend). */
  hasSession: boolean;
  /** El visitante está navegando una ruta pública (login, landing) — la cookie no importa. */
  isPublicRoute: boolean;
};

export async function getSsrSession(): Promise<SsrSessionState> {
  // Next 15+: headers() es async — devuelve Promise<ReadonlyHeaders>.
  const h = await headers();
  const hasSession = h.get("x-jaxon-has-session") === "1";
  const isPublicRoute = h.get("x-jaxon-public") === "1";
  return { hasSession, isPublicRoute };
}