"use client";

import { useQuery } from "@tanstack/react-query";
import { ticketsService } from "@features/tickets/services/ticketsService";
import type { Page } from "@shared/types/api";
import type { Ticket } from "@features/tickets/types/tickets.types";

export function useTechnicianQueue() {
  return useQuery({
    queryKey: ["tickets", "queue"],
    queryFn: async () => {
      const result = await ticketsService.list();
      return Array.isArray(result) ? result : (result as Page<Ticket>).content;
    },
    refetchInterval: 30_000
  });
}
