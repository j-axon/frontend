/**
 * Tipos de dominio para Tickets — alineados con el backend y frontend de los compañeros.
 */

export type TicketStatus = "ABIERTO" | "EN_PROCESO" | "RESUELTO" | "CERRADO";
export type TicketPriority = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";
export type TicketCategory =
  | "HARDWARE"
  | "SOFTWARE"
  | "RED"
  | "SEGURIDAD"
  | "OTROS";

export type Ticket = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assetId?: string;
  assetName?: string;
  asset?: {
    id: string;
    code: string;
    name: string;
  } | null;
  createdById?: string;
  createdByName?: string;
  reporterId?: string;
  reporterName?: string;
  assigneeId?: string;
  assigneeName?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  resolvedAt?: string;
};

export type TicketResponse = Ticket;

export type CreateTicketRequest = {
  title: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
  assetId?: string;
  assetQrUuid?: string;
  qrUuid?: string;
};

export type TicketComment = {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  body: string;
  internal: boolean;
  createdAt: string;
};

export type CreateTicketCommentRequest = {
  body: string;
  internal?: boolean;
};

export type TicketAttachment = {
  id: string;
  ticketId: string;
  fileName: string;
  contentType: string;
  size: number;
  url: string;
  uploadedAt: string;
};
