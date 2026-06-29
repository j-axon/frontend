import { apiClient } from "@shared/lib/http/client";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";

export const aiService = {
  diagnose(ticketId: string): Promise<AiDiagnosticResponse> {
    return apiClient<AiDiagnosticResponse>(`/ai/tickets/${ticketId}/diagnose`, {
      method: "POST"
    });
  }
};
