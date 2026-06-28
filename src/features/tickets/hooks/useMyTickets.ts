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

type MyTicketsApiResponse = {
  items: MyTicket[];
};

async function fetchMyTickets(): Promise<MyTicket[]> {
  const response = await httpClient<MyTicketsApiResponse>("/v1/tickets/me");
  return response.items;
}

export function useMyTickets() {
  return useQuery({
    queryKey: ["my-tickets"],
    queryFn: fetchMyTickets,
    staleTime: 20_000
  });
}
