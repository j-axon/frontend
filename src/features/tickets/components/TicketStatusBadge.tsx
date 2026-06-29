import * as React from "react";
import { Badge } from "@shared/components/ui/Badge";
import type { TicketStatus } from "@features/tickets/types/tickets.types";

const statusToTone: Record<TicketStatus, "neutral" | "info" | "warning" | "success" | "danger"> = {
  OPEN: "info",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CLOSED: "neutral",
  CANCELLED: "danger"
};

const statusToLabel: Record<TicketStatus, string> = {
  OPEN: "Abierto",
  IN_PROGRESS: "En progreso",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado"
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Badge tone={statusToTone[status]}>{statusToLabel[status]}</Badge>;
}
