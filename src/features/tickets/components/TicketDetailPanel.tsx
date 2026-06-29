"use client";

import * as React from "react";
import { Card } from "@shared/components/ui/Card";
import { TicketStatusBadge } from "@features/tickets/components/TicketStatusBadge";
import type { Ticket } from "@features/tickets/types/tickets.types";

export function TicketDetailPanel({ ticket }: { ticket: Ticket }) {
  return (
    <Card
      title={ticket.title}
      description={`Código ${ticket.code}`}
      actions={<TicketStatusBadge status={ticket.status} />}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <Field label="Categoría" value={ticket.category} />
        <Field
          label="Prioridad"
          value={
            <span
              className={
                ticket.priority === "CRITICAL"
                  ? "text-danger"
                  : ticket.priority === "HIGH"
                  ? "text-warning"
                  : "text-fg"
              }
            >
              {ticket.priority}
            </span>
          }
        />
        <Field
          label="Reportado por"
          value={ticket.reporterName}
        />
        <Field
          label="Asignado a"
          value={ticket.assigneeName ?? "Sin asignar"}
        />
        <Field
          label="Activo"
          value={ticket.asset?.code ?? "—"}
        />
        <Field
          label="Creado"
          value={new Date(ticket.createdAt).toLocaleString()}
        />
      </dl>
      <div className="mt-4 rounded-md border border-border bg-bg p-3 text-sm text-fg-soft">
        {ticket.description}
      </div>
    </Card>
  );
}

function Field({
  label,
  value
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs uppercase text-fg-soft">{label}</dt>
      <dd className="text-sm text-fg">{value}</dd>
    </div>
  );
}
