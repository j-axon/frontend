"use client";

import { useCallback } from "react";
import { useAuthStore } from "@features/auth/store/authStore";
import { sessionService } from "@features/auth/services/sessionService";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

export function useRefreshSession() {
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  return useCallback(async () => {
    try {
      const refreshed = await sessionService.refresh();
      tokenMemoryStore.set(refreshed.accessToken);
      setSession(refreshed.usuario, refreshed.accessToken);
      return refreshed.usuario;
    } catch {
      tokenMemoryStore.clear();
      clearSession();
      return null;
    }
  }, [setSession, clearSession]);
}
