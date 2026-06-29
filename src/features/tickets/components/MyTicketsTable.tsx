"use client";

import * as React from "react";
import Link from "next/link";
import { TicketStatusBadge } from "./TicketStatusBadge";
import type { Ticket } from "@features/tickets/types/tickets.types";

export function MyTicketsTable({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
        <p className="text-lg font-semibold text-fg">Aún no tienes tickets</p>
        <p className="mt-1 text-sm text-fg-soft">
          Escanea el QR de un activo para crear tu primer ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Listado de mis tickets</caption>
        <thead className="bg-bg-soft text-left text-xs uppercase tracking-wide text-fg-soft">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Activo</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Creado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tickets.map((t) => (
            <tr key={t.id} className="bg-bg hover:bg-muted/40">
              <td className="px-4 py-3 font-mono text-xs">{t.code}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/my-tickets/${t.id}`}
                  className="text-fg hover:text-accent"
                >
                  {t.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-fg-soft">
                {t.asset?.code ?? "—"}
              </td>
              <td className="px-4 py-3">
                <TicketStatusBadge status={t.status} />
              </td>
              <td className="px-4 py-3 text-fg-soft">
                {new Date(t.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
