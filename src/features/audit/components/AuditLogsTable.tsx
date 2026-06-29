"use client";

import * as React from "react";
import { Badge } from "@shared/components/ui/Badge";

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
};

export function AuditLogsTable({ logs }: { logs: AuditLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
        <p className="text-lg font-semibold text-fg">Sin registros</p>
        <p className="mt-1 text-sm text-fg-soft">
          No hay logs que coincidan con los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Logs de auditoría</caption>
        <thead className="bg-bg-soft text-left text-xs uppercase tracking-wide text-fg-soft">
          <tr>
            <th scope="col" className="px-4 py-3">Fecha</th>
            <th scope="col" className="px-4 py-3">Actor</th>
            <th scope="col" className="px-4 py-3">Acción</th>
            <th scope="col" className="px-4 py-3">Recurso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map((l) => (
            <tr key={l.id} className="bg-bg hover:bg-muted/40">
              <td className="px-4 py-3 text-fg-soft">{new Date(l.createdAt).toLocaleString()}</td>
              <td className="px-4 py-3 text-fg">{l.actor}</td>
              <td className="px-4 py-3">
                <Badge tone="info">{l.action}</Badge>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-fg-soft">{l.resource}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
