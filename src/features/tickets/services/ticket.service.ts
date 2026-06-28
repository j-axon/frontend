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

// NOTE: Backend does NOT expose /v1/tickets?assignee=me (the technician
// queue). It only exposes /v1/tickets/my (the current user's tickets).
// Until a real /v1/tickets/admin endpoint exists, the technician queue
// view will fetch the current user's tickets as a best approximation.

export const ticketService = {
  createTicket,

  async fetchTechnicianTickets(): Promise<TechnicianTicket[]> {
    return httpClient<TechnicianTicket[]>("/v1/tickets/my");
  },

  // NOTE: Backend does NOT expose PATCH /v1/tickets/{id}/status.
  // Keeping the helper so the UI compiles, but it will throw at runtime
  // until the endpoint is added.
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