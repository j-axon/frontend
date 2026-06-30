"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@features/auth/store/authStore";
import { sessionService } from "@features/auth/services/sessionService";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

/**
 * Inicializa la sesión:
 *  1. Si el middleware confirmó `hasSession === false` en SSR, NO dispara
 *     `/auth/me` ni `refresh` (ahorra un 401 espurio y el flash de login).
 *  2. En cualquier otro caso, intenta refresh silencioso (cookie HttpOnly).
 *  3. Si hay access token, trae /auth/me.
 *  4. Si nada funciona, el usuario queda como null (no autenticado).
 */
export function useCurrentUser() {
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const ssrHasSession = useAuthStore((s) => s.ssrHasSession);

  const query = useQuery({
    queryKey: ["auth", "current-user"],
    enabled: ssrHasSession !== false, // skip si el middleware ya confirmó no-session
    queryFn: async () => {
      // Si no hay token en memoria, intentamos refresh primero.
      if (!tokenMemoryStore.get()) {
        try {
          const refreshed = await sessionService.refresh();
          tokenMemoryStore.set(refreshed.accessToken);
        } catch {
          throw new Error("NO_SESSION");
        }
      }
      const me = await sessionService.me();
      setSession(me, tokenMemoryStore.get() ?? "");
      return me;
    },
    staleTime: 5 * 60_000,
    retry: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (query.error && isAuthenticated) {
      tokenMemoryStore.clear();
      clearSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.error]);

  return { user, isAuthenticated, isLoading: query.isLoading, error: query.error };
}
