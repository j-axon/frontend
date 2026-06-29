"use client";

import { useMutation } from "@tanstack/react-query";
import { aiService } from "@features/ai/services/aiService";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";

export function useGenerateDiagnosis(ticketId: string) {
  return useMutation({
    mutationFn: () => aiService.diagnose(ticketId)
  }) as unknown as {
    mutateAsync: () => Promise<AiDiagnosticResponse>;
    isPending: boolean;
    isError: boolean;
  };
}
