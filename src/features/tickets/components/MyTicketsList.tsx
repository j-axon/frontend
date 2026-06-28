"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TicketCard } from "@/features/tickets/components/TicketCard";
import { useMyTickets } from "@/features/tickets/hooks/useMyTickets";
import { useWebSocketSubscription } from "@/hooks/use-websocket";
import type { TicketStatus } from "@/types/ticket";

const FILTERS: Array<{ label: string; value: TicketStatus | "ALL" }> = [
  { label: "Todos", value: "ALL" },
  { label: "Abiertos", value: "OPEN" },
  { label: "En progreso", value: "IN_PROGRESS" },
  { label: "Resueltos", value: "RESOLVED" },
  { label: "Cerrados", value: "CLOSED" }
];

export function MyTicketsList() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<TicketStatus | "ALL">("ALL");
  const { data, isLoading, isError, refetch } = useMyTickets();

  useWebSocketSubscription({
    path: "/tickets/stream",
    onMessage: (event) => {
      const payload = JSON.parse(event.data) as { type?: string; ownerScope?: string };

      if (payload.type === "TICKET_UPDATED" && payload.ownerScope === "ME") {
        void queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
      }
    }
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
    return <p className="text-sm text-slate-600">Cargando tus tickets...</p>;
  }

  if (isError) {
    return (
      <div className="grid gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm text-rose-700">No fue posible cargar tus tickets.</p>
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
          No tienes tickets registrados para este filtro.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </section>
  );
}
