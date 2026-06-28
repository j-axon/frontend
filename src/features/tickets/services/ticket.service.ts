import { httpClient } from "@/lib/api/http-client";
import {
  CreateTicketRequest,
  CreateTicketResponse,
} from "@/features/tickets/types/ticket.types";

export async function createTicket(
  data: CreateTicketRequest
): Promise<CreateTicketResponse> {
  return httpClient<CreateTicketResponse>("/v1/tickets", {
    method: "POST",
    body: data,
  });
}
