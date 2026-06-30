"use client";

import { useQuery } from "@tanstack/react-query";
import { aiService } from "@features/ai/services/aiService";
import { ApiRequestError } from "@shared/lib/http/errors";
import { useAuthStore } from "@features/auth/store/authStore";
import { ROLES, type Role } from "@/constants/roles";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";

/**
 * Recupera el último diagnóstico IA cacheado para un ticket.
 *
 * - Devuelve `null` cuando el backend responde 404 (aún no hay diagnóstico).
 *   La ausencia de caché es un estado válido y NO debe propagarse como error.
 * - Solo se ejecuta si el usuario tiene rol TECNICO o ADMIN.
 */
export function useLatestDiagnosis(ticketId: string) {
  const roles = useAuthStore((s) => s.user?.roles) ?? [];
  const allowed = roles.includes(ROLES.TECNICO as Role) || roles.includes(ROLES.ADMIN as Role);

  return useQuery<AiDiagnosticResponse | null>({
    queryKey: ["ai-diagnostic", ticketId, "latest"],
    queryFn: async () => {
      try {
        return await aiService.getLatest(ticketId);
      } catch (err) {
        if (err instanceof ApiRequestError && err.status === 404) {
          return null;
        }
        throw err;
      }
    },
    enabled: Boolean(ticketId) && allowed,
    staleTime: 60_000,
    retry: false
  });
}