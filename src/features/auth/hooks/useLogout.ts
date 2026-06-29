"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@features/auth/services/authService";
import { useAuthStore } from "@features/auth/store/authStore";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";
import { ROUTES } from "@/constants/routes";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);

  return useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // aunque falle el backend, limpiamos sesión local.
    }
    tokenMemoryStore.clear();
    clearSession();
    router.replace(ROUTES.login);
  }, [router, clearSession]);
}
