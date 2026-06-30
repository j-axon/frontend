import * as React from "react";
import { Badge } from "@shared/components/ui/Badge";
import type { TicketPriority } from "@features/tickets/types/tickets.types";

const priorityToTone: Record<TicketPriority, "neutral" | "info" | "warning" | "success" | "danger"> = {
  BAJA: "neutral",
  MEDIA: "info",
  ALTA: "warning",
  URGENTE: "danger"
};

const priorityToLabel: Record<TicketPriority, string> = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
  URGENTE: "Urgente"
};

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <Badge tone={priorityToTone[priority]}>{priorityToLabel[priority]}</Badge>;
}