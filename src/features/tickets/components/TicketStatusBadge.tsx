import type { TicketStatus } from "@/types/ticket";

type TicketStatusBadgeProps = {
  status: TicketStatus;
};

const STATUS_STYLES: Record<TicketStatus, string> = {
  OPEN: "bg-amber-100 text-amber-800 border-amber-300",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-300",
  RESOLVED: "bg-emerald-100 text-emerald-800 border-emerald-300",
  CLOSED: "bg-slate-200 text-slate-700 border-slate-300"
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  OPEN: "Abierto",
  IN_PROGRESS: "En progreso",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado"
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
      data-testid="ticket-status-badge"
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
