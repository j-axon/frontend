"use client";

import type { ReportKPI } from "@/types/reports";

export type ReportKpiCardProps = {
  kpi: ReportKPI;
};

function getTrendIcon(trend?: "up" | "down" | "neutral") {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "→";
}

function getTrendColor(trend?: "up" | "down" | "neutral") {
  if (trend === "up") return "text-green-600";
  if (trend === "down") return "text-red-600";
  return "text-gray-600";
}

function calculateChange(current: number, previous?: number): string {
  if (!previous) return "";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

export function ReportKpiCard({ kpi }: ReportKpiCardProps) {
  const change = calculateChange(kpi.value, kpi.previousValue);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{kpi.label}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">
          {kpi.value.toLocaleString("es-CO")}
        </span>
        {kpi.unit && (
          <span className="text-sm text-gray-500">{kpi.unit}</span>
        )}
      </div>
      {kpi.trend && (
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className={getTrendColor(kpi.trend)}>
            {getTrendIcon(kpi.trend)}
          </span>
          {change && (
            <span className={getTrendColor(kpi.trend)}>{change}</span>
          )}
          <span className="text-gray-500">vs anterior</span>
        </div>
      )}
    </div>
  );
}