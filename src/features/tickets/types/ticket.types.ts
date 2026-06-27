export const TICKET_CATEGORIES = ["HARDWARE", "SOFTWARE", "NETWORK", "ACCESS", "OTHER"] as const;

export const TICKET_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number];

export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export type CreateTicketRequest = {
  assetUuid: string;
  descripcion: string;
  categoria: TicketCategory;
  prioridad: TicketPriority;
  adjuntos?: string[];
};

export type CreateTicketResponse = {
  uuid: string;
  codigo: string;
  estado: string;
  createdAt: string;
};
