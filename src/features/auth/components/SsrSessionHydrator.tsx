"use client";

import { useEffect } from "react";
import { useAuthStore } from "@features/auth/store/authStore";

type Props = {
  /** Resultado de `getSsrSession()` en el server component que lo envuelve. */
  hasSession: boolean | null;
};

/**
 * Sincroniza el juicio del middleware (presencia de cookie `jaxon_refresh_token`)
 * con el store cliente, en el primer render tras hidratación. Después el store
 * se actualiza por eventos de login/logout normalmente.
 *
 * Se monta una sola vez por mount del layout protegido.
 */
export function SsrSessionHydrator({ hasSession }: Props) {
  const setSsrHasSession = useAuthStore((s) => s.setSsrHasSession);
  useEffect(() => {
    setSsrHasSession(hasSession);
    // No re-ejecutar: el store sólo necesita el valor inicial del SSR.
    // Cambios posteriores se manejan vía setSession/clearSession.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}