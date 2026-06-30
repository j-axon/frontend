"use client";

import { useCallback } from "react";
import { useAuthStore } from "@features/auth/store/authStore";
import { sessionService } from "@features/auth/services/sessionService";
import { mapAuthUser } from "@features/auth/utils/mapAuthUser";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

export function useRefreshSession() {
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  return useCallback(async () => {
    try {
      const refreshed = await sessionService.refresh();
      tokenMemoryStore.set(refreshed.accessToken);
      const user = refreshed.usuario
        ? mapAuthUser(refreshed.usuario)
        : await sessionService.me();
      setSession(user, refreshed.accessToken);
      return user;
    } catch {
      tokenMemoryStore.clear();
      clearSession();
      return null;
    }
  }, [setSession, clearSession]);
}
