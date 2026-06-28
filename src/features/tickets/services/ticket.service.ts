import { httpClient } from "@/lib/api/http-client";
import {
  CreateTicketRequest,
  CreateTicketResponse,
  TicketStatus,
} from "@/features/tickets/types/ticket.types";

export async function createTicket(
  data: CreateTicketRequest
): Promise<CreateTicketResponse> {
  return httpClient<CreateTicketResponse>("/v1/tickets", {
    method: "POST",
    body: data,
  });
}

export type TechnicianTicket = {
  id: string;
  code: string;
  title: string;
  status: TicketStatus;
  priority: string;
  category: string;
  createdAt: string;
  asset: {
    id: string;
    code: string;
    name: string;
  };
  requester: {
    id: string;
    name: string;
  };
};

type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
};

export const ticketService = {
  createTicket,

  async fetchTechnicianTickets(): Promise<TechnicianTicket[]> {
    const response = await httpClient<PaginatedResponse<TechnicianTicket>>(
      "/v1/tickets?assignee=me&status=OPEN,IN_PROGRESS"
    );
    return response.items;
  },

  async updateTicketStatus(
    ticketId: string,
    newStatus: TicketStatus
  ): Promise<void> {
    await httpClient(`/v1/tickets/${ticketId}/status`, {
      method: "PATCH",
      body: { status: newStatus },
    });
  },
};