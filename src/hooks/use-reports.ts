"use client";

import { useQueries } from "@tanstack/react-query";
import { reportsService } from "@features/reports/services/reportsService";

export function useReportsBundle() {
  return useQueries({
    queries: [
      {
        queryKey: ["reports", "tickets-summary"],
        queryFn: () => reportsService.ticketsSummary()
      },
      {
        queryKey: ["reports", "assets-incidents"],
        queryFn: () => reportsService.assetsIncidents()
      }
    ]
  });
}
