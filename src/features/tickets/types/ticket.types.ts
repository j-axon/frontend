export const TICKET_CATEGORIES = [
  "Mantenimiento",
  "Soporte Técnico",
  "Infraestructura",
  "Otros",
] as const;

export const TICKET_PRIORITIES = ["Baja", "Media", "Alta"] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export interface CreateTicketRequest {
  assetUuid: string;
  description: string;
  category: TicketCategory;
  priority?: TicketPriority;
}

export interface CreateTicketResponse {
  id: string;
  message: string;
}
