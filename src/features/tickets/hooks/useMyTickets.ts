"use client";

import { useQuery } from "@tanstack/react-query";
import { ticketsService } from "@features/tickets/services/ticketsService";

export function useMyTickets() {
  return useQuery({
    queryKey: ["tickets", "mine"],
    queryFn: () => ticketsService.myTickets()
  });
}
