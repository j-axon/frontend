import { httpClient } from "@/lib/api/http-client";
import type { AuditLog, AuditFilters, AuditLogsResponse } from "@/types/audit";

export type GetAuditLogsParams = AuditFilters & {
  page?: number;
  pageSize?: number;
};

export async function getAuditLogs(
  params: GetAuditLogsParams = {}
): Promise<AuditLogsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.userId) searchParams.set("userId", params.userId);
  if (params.action) searchParams.set("action", params.action);
  if (params.entityType) searchParams.set("entityType", params.entityType);
  if (params.startDate) searchParams.set("startDate", params.startDate);
  if (params.endDate) searchParams.set("endDate", params.endDate);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));

  const queryString = searchParams.toString();
  const path = queryString ? `/audit/logs?${queryString}` : "/audit/logs";

  return httpClient<AuditLogsResponse>(path, { method: "GET" });
}

export async function getAuditLogById(id: string): Promise<AuditLog> {
  return httpClient<AuditLog>(`/audit/logs/${id}`, { method: "GET" });
}