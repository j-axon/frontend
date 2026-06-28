import { TicketStatusBadge } from "@/features/tickets/components/TicketStatusBadge";
import type { MyTicket } from "@/features/tickets/hooks/useMyTickets";

type TicketCardProps = {
  ticket: MyTicket;
};

function formatDate(date: string): string {
  return new Date(date).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">{ticket.code}</p>
          <h3 className="text-base font-semibold text-slate-900">{ticket.title}</h3>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="grid gap-1 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-900">Activo:</span> {ticket.asset.name} ({ticket.asset.code})
        </p>
        <p>
          <span className="font-medium text-slate-900">Creado:</span> {formatDate(ticket.createdAt)}
        </p>
      </div>
    </article>
  );
}
