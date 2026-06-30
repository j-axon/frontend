import * as React from "react";
import { Badge } from "@shared/components/ui/Badge";
import type { TicketStatus } from "@features/tickets/types/tickets.types";

const statusToTone: Record<TicketStatus, "neutral" | "info" | "warning" | "success" | "danger"> = {
  ABIERTO: "warning",
  EN_PROCESO: "info",
  RESUELTO: "success",
  CERRADO: "neutral"
};

const statusToLabel: Record<TicketStatus, string> = {
  ABIERTO: "Abierto",
  EN_PROCESO: "En proceso",
  RESUELTO: "Resuelto",
  CERRADO: "Cerrado"
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Badge tone={statusToTone[status]}>{statusToLabel[status]}</Badge>;
}