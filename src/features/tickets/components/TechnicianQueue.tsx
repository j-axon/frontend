"use client";

import * as React from "react";
import Link from "next/link";
import { TicketStatusBadge } from "@features/tickets/components/TicketStatusBadge";
import type { Ticket } from "@features/tickets/types/tickets.types";
import { ROUTES } from "@/constants/routes";

export function TechnicianQueue({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
        <p className="text-lg font-semibold text-fg">Sin tickets pendientes 🎉</p>
        <p className="mt-1 text-sm text-fg-soft">
          No hay tickets asignados a tu cola por ahora.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tickets.map((t) => (
        <li key={t.id}>
          <Link
            href={ROUTES.technicianTicket(t.id)}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-bg-soft px-4 py-3 hover:bg-muted"
          >
            <div>
              <p className="font-medium text-fg">{t.title}</p>
              <p className="text-xs text-fg-soft">
                {t.code} · {t.asset?.code ?? "sin activo"} · prioridad{" "}
                <span className={priorityColor(t.priority)}>{t.priority}</span>
              </p>
            </div>
            <TicketStatusBadge status={t.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function priorityColor(p: string) {
  switch (p) {
    case "CRITICAL":
      return "text-danger";
    case "HIGH":
      return "text-warning";
    case "MEDIUM":
      return "text-fg";
    default:
      return "text-fg-soft"
  }
}
