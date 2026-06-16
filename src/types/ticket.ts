export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type Ticket = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TicketStatus;
  assetId?: string;
};
