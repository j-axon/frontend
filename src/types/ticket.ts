export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketCategory =
  | "HARDWARE"
  | "SOFTWARE"
  | "NETWORK"
  | "PERIPHERAL"
  | "OTHER";

/** Embedded asset reference for UI (lo enriquece el backend o el mapper). */
export interface TicketAssetRef {
  id: string;
  code: string;
  name: string;
}

/** Embedded owner reference for UI. */
export interface TicketOwnerRef {
  id: string;
  name: string;
  email?: string;
}

export type Ticket = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assetId?: string;
  asset?: TicketAssetRef;
  owner?: TicketOwnerRef;
  createdAt?: string;
  updatedAt?: string;
};