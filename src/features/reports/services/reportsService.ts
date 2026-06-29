import { apiClient } from "@shared/lib/http/client";
import type { TicketMetrics } from "@features/reports/components/TicketMetricsCards";
import type { AssetsIncidents } from "@features/reports/components/AssetsIncidentsChart";

export const reportsService = {
  ticketsSummary(): Promise<TicketMetrics> {
    return apiClient<TicketMetrics>("/reports/tickets/summary");
  },
  assetsIncidents(): Promise<AssetsIncidents> {
    return apiClient<AssetsIncidents>("/reports/assets/incidents");
  }
};
