"use client";

import * as React from "react";
import { Card } from "@shared/components/ui/Card";

export type AssetsIncidents = Array<{ assetCode: string; incidents: number }>;

export function AssetsIncidentsChart({ data }: { data: AssetsIncidents }) {
  const max = Math.max(1, ...data.map((d) => d.incidents));

  if (data.length === 0) {
    return (
      <Card title="Incidentes por activo" description="Top 10">
        <p className="text-sm text-fg-soft">Sin incidentes registrados.</p>
      </Card>
    );
  }

  return (
    <Card title="Incidentes por activo" description="Top 10 con más tickets">
      <ul className="flex flex-col gap-2" aria-label="Gráfico de barras de incidentes por activo">
        {data.map((d) => (
          <li key={d.assetCode} className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 truncate font-mono text-xs">
              {d.assetCode}
            </span>
            <div
              className="h-3 rounded bg-gradient-to-r from-indigo-500 to-cyan-400"
              style={{ width: `${(d.incidents / max) * 100}%` }}
              aria-hidden
            />
            <span className="w-8 text-right text-fg">{d.incidents}</span>
            <span className="sr-only">{d.incidents} incidentes</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
