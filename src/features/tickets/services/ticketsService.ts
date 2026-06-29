import { apiClient } from "@shared/lib/http/client";
import type {
  CreateTicketRequest,
  Ticket,
  TicketResponse
} from "@features/tickets/types/tickets.types";
import type { Page } from "@shared/types/api";

export const ticketsService = {
  async myTickets(): Promise<Ticket[]> {
    // Algunas implementaciones devuelven Page, otras array; normalizamos.
    const result = await apiClient<Page<Ticket> | Ticket[]>("/tickets/my", {
      method: "GET"
    });
    return Array.isArray(result) ? result : result.content;
  },
  async list(params?: { status?: string; assigneeId?: string }) {
    return apiClient<Page<Ticket> | Ticket[]>("/tickets", {
      method: "GET",
      query: {
        status: params?.status,
        assigneeId: params?.assigneeId
      }
    });
  },
  async byId(id: string): Promise<TicketResponse> {
    return apiClient<TicketResponse>(`/tickets/${id}`);
  },
  async create(payload: CreateTicketRequest): Promise<TicketResponse> {
    return apiClient<TicketResponse>("/tickets", {
      method: "POST",
      body: payload
    });
  },
  async update(id: string, payload: Partial<Ticket>) {
    return apiClient<TicketResponse>(`/tickets/${id}`, {
      method: "PATCH",
      body: payload
    });
  }
};
