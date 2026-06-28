"use client";

import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import type { TicketStatus } from "@/types/ticket";

export type MyTicket = {
  id: string;
  code: string;
  title: string;
  status: TicketStatus;
  createdAt: string;
  asset: {
    id: string;
    code: string;
    name: string;
  };
};

// Backend returns a bare array (not a paginated envelope).
async function fetchMyTickets(): Promise<MyTicket[]> {
  return httpClient<MyTicket[]>("/v1/tickets/my");
}

export function useMyTickets() {
  return useQuery({
    queryKey: ["my-tickets"],
    queryFn: fetchMyTickets,
    staleTime: 20_000
  });
}
