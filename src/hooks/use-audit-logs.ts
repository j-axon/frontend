"use client";

import { useQuery } from "@tanstack/react-query";
import { auditService } from "@features/audit/services/auditService";

export function useAuditLogs(filters?: Record<string, string | undefined>) {
  return useQuery({
    queryKey: ["audit", "logs", filters],
    queryFn: async () => {
      const page = await auditService.list(filters);
      return page.content;
    }
  });
}
