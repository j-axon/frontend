"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ticketService } from "@/features/tickets/services/ticket.service";
import { TicketStatusBadge } from "@/features/tickets/components/TicketStatusBadge";
import type { TicketStatus } from "@/types/ticket";

const FILTERS: Array<{ label: string; value: TicketStatus | "ALL" }> = [
  { label: "Todos", value: "ALL" },
  { label: "Abiertos", value: "OPEN" },
  { label: "En progreso", value: "IN_PROGRESS" },
  { label: "Resueltos", value: "RESOLVED" },
  { label: "Cerrados", value: "CLOSED" }
];

export function TechnicianTicketQueue() {
  const [filter, setFilter] = useState<TicketStatus | "ALL">("ALL");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["technician-tickets"],
    queryFn: ticketService.fetchTechnicianTickets,
    staleTime: 20_000
  });

  const filteredTickets = useMemo(() => {
    if (!data) {
      return [];
    }

    if (filter === "ALL") {
      return data;
    }

    return data.filter((ticket) => ticket.status === filter);
  }, [data, filter]);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Cargando cola de tickets...</p>;
  }

  if (isError) {
    return (
      <div className="grid gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm text-rose-700">No fue posible cargar los tickets.</p>
        <button
          className="w-fit rounded-md border border-rose-300 px-3 py-1.5 text-sm text-rose-800"
          onClick={() => void refetch()}
          type="button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === item.value
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No hay tickets en la cola para este filtro.
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredTickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/technician/tickets/${ticket.id}`}
              className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-400 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-500">{ticket.code}</p>
                  <h3 className="text-base font-semibold text-slate-900">{ticket.title}</h3>
                </div>
                <TicketStatusBadge status={ticket.status} />
              </div>

              <div className="grid gap-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">Activo:</span>{" "}
                  {ticket.asset ? `${ticket.asset.name} (${ticket.asset.code})` : "—"}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Solicitante:</span>{" "}
                  {ticket.owner?.name ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Creado:</span>{" "}
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleString("es-CO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
