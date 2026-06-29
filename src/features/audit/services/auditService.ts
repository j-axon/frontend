import { apiClient } from "@shared/lib/http/client";
import type { Page } from "@shared/types/api";
import type { AuditLog } from "@features/audit/components/AuditLogsTable";

export const auditService = {
  list(filters?: {
    actor?: string;
    action?: string;
    from?: string;
    to?: string;
  }) {
    return apiClient<Page<AuditLog>>("/audit/logs", {
      method: "GET",
      query: filters as Record<string, string | undefined>
    });
  }
};
