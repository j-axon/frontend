import { httpClient } from "@/lib/api/http-client";
import type { Ticket } from "@/types/ticket";
import {
  CreateTicketRequest,
  CreateTicketResponse,
} from "@/features/tickets/types/ticket.types";

/**
 * Backend response shape for GET /api/v1/tickets/my.
 * Kept inline porque la implementación del `TicketService` (FE-008) está
 * pendiente — solo necesitamos que TS compile hasta entonces.
 */
interface TicketListResponse {
  content?: Ticket[];
  items?: Ticket[];
}

/**
 * Ticket service facade — agregamos los métodos que faltan (FE-008) en
 * commits posteriores usando los endpoints reales del backend:
 * - createTicket       → POST /tickets (ya existe)
 * - fetchTechnicianTickets → GET /tickets/my (workaround mientras el
 *   backend no expone /tickets/technician)
 * - fetchTicketById    → GET /tickets/{id} (TODO: ver CLAUDE.md)
 */
export const ticketService = {
  createTicket(data: CreateTicketRequest): Promise<CreateTicketResponse> {
    return httpClient<CreateTicketResponse>("/tickets", {
      method: "POST",
      body: data,
    });
  },

  fetchTechnicianTickets(): Promise<Ticket[]> {
    return httpClient<TicketListResponse>("/tickets/my", { method: "GET" })
      .then((res) => res.content ?? res.items ?? []);
  },

  fetchTicketById(id: string): Promise<Ticket | null> {
    // TODO: connect to GET /api/v1/tickets/{id} once backend exposes it.
    void id;
    return Promise.resolve(null);
  },

  updateTicketStatus(id: string, status: string): Promise<void> {
    // TODO: backend expone POST /api/v1/tickets/{id}/comments, no hay
    // endpoint dedicado de status todavía — UI solo rebota la página.
    void id;
    void status;
    return Promise.resolve();
  },
};

export async function createTicket(
  data: CreateTicketRequest
): Promise<CreateTicketResponse> {
  return ticketService.createTicket(data);
}
