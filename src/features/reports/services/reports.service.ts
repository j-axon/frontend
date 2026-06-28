import { httpClient } from "@/lib/api/http-client";
import type { ReportsSummary, ReportsFilters, ReportKPI, TicketsByCategory } from "@/types/reports";

export type GetReportsSummaryParams = ReportsFilters;

export async function getReportsSummary(
  params: GetReportsSummaryParams = {}
): Promise<ReportsSummary> {
  const searchParams = new URLSearchParams();
  
  if (params.startDate) searchParams.set("startDate", params.startDate);
  if (params.endDate) searchParams.set("endDate", params.endDate);
  if (params.category) searchParams.set("category", params.category);
  if (params.technicianId) searchParams.set("technicianId", params.technicianId);

  const queryString = searchParams.toString();
  const path = queryString ? `/reports/summary?${queryString}` : "/reports/summary";

  return httpClient<ReportsSummary>(path, { method: "GET" });
}

export async function getKPIs(): Promise<ReportKPI[]> {
  return httpClient<ReportKPI[]>("/reports/kpis", { method: "GET" });
}

export async function getTicketsByCategory(): Promise<TicketsByCategory[]> {
  return httpClient<TicketsByCategory[]>("/reports/tickets-by-category", { method: "GET" });
}