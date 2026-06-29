"use client";

import { useQuery } from "@tanstack/react-query";
import { ticketsService } from "@features/tickets/services/ticketsService";

export function useTicketDetail(id: string) {
  return useQuery({
    queryKey: ["tickets", "detail", id],
    queryFn: () => ticketsService.byId(id),
    enabled: Boolean(id)
  });
}
