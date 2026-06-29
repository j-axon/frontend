"use client";

import * as React from "react";
import { Card } from "@shared/components/ui/Card";

export type TicketMetrics = {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  critical: number;
  averageResolutionHours?: number;
};

export function TicketMetricsCards({ metrics }: { metrics: TicketMetrics }) {
  const items: Array<{ label: string; value: number | string; tone: "brand" | "info" | "warning" | "success" | "danger" }> = [
    { label: "Total tickets", value: metrics.total, tone: "brand" },
    { label: "Abiertos", value: metrics.open, tone: "info" },
    { label: "En progreso", value: metrics.inProgress, tone: "warning" },
    { label: "Resueltos", value: metrics.resolved, tone: "success" },
    { label: "Críticos", value: metrics.critical, tone: "danger" }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it) => (
        <Card key={it.label} padding="sm">
          <p className="text-xs uppercase text-fg-soft">{it.label}</p>
          <p className="mt-1 text-3xl font-bold text-fg">{it.value}</p>
        </Card>
      ))}
      <Card padding="sm">
        <p className="text-xs uppercase text-fg-soft">Tiempo medio de resolución</p>
        <p className="mt-1 text-3xl font-bold text-fg">
          {metrics.averageResolutionHours
            ? `${metrics.averageResolutionHours.toFixed(1)} h`
            : "—"}
        </p>
      </Card>
    </div>
  );
}
