import { HttpClientError, httpClient } from "@/lib/api/http-client";
import type {
  CreateTicketRequest,
  CreateTicketResponse
} from "@/features/tickets/types/ticket.types";

export class TicketCreateForbiddenError extends Error {
  constructor() {
    super("No tienes permisos para reportar sobre este activo.");
    this.name = "TicketCreateForbiddenError";
  }
}

export async function createTicketFromQr(
  payload: CreateTicketRequest
): Promise<CreateTicketResponse> {
  try {
    return await httpClient<CreateTicketResponse>("/v1/tickets", {
      method: "POST",
      body: payload
    });
  } catch (error) {
    if (error instanceof HttpClientError && error.status === 403) {
      throw new TicketCreateForbiddenError();
    }

    throw new Error("No fue posible crear el ticket.");
  }
}
