import { apiClient } from "@shared/lib/http/client";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";

export const aiService = {
  diagnose(ticketId: string): Promise<AiDiagnosticResponse> {
    return apiClient<AiDiagnosticResponse>(`/ai/tickets/${ticketId}/diagnose`, {
      method: "POST"
    });
  },

  /**
   * Recupera el último diagnóstico cacheado para un ticket (TECNICO/ADMIN).
   * Si no existe diagnóstico previo, el backend responde 404 y el caller
   * debe tratarlo como estado válido (sin caché), no como error.
   */
  getLatest(ticketId: string): Promise<AiDiagnosticResponse> {
    return apiClient<AiDiagnosticResponse>(`/ai/tickets/${ticketId}/latest`, {
      method: "GET"
    });
  }
};