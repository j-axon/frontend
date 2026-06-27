import { httpClient } from "@/lib/api/http-client";
import type { TicketStatus } from "@/types/ticket";

export type TechnicianTicket = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  asset: {
    id: string;
    code: string;
    name: string;
  };
  owner: {
    id: string;
    name: string;
  };
};

type TechnicianTicketsApiResponse = {
  items: TechnicianTicket[];
};

async function fetchTechnicianTickets(): Promise<TechnicianTicket[]> {
  const response = await httpClient<TechnicianTicketsApiResponse>("/v1/tickets/technician");
  return response.items;
}

async function updateTicketStatus(ticketId: string, status: TicketStatus): Promise<void> {
  await httpClient(`/v1/tickets/${ticketId}/status`, {
    method: "PATCH",
    body: { status }
  });
}

export const ticketService = {
  fetchTechnicianTickets,
  updateTicketStatus
};
