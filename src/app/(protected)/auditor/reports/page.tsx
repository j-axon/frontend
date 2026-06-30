"use client";

import { useState, useEffect, useCallback } from "react";
import { ReportKpiCard } from "@/features/reports/components/ReportKpiCard";
import { TicketsByCategoryChart } from "@/features/reports/components/TicketsByCategoryChart";
import { getReportsSummary, getKPIs, getTicketsByCategory } from "@/features/reports/services/reports.service";
import type { ReportsSummary, ReportKPI, TicketsByCategory } from "@/types/reports";

export default function AuditorReportsPage() {
  const [kpis, setKpis] = useState<ReportKPI[]>([]);
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [ticketsByCategory, setTicketsByCategory] = useState<TicketsByCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [kpisData, summaryData, categoryData] = await Promise.all([
        getKPIs(),
        getReportsSummary(),
        getTicketsByCategory(),
      ]);
      setKpis(kpisData);
      setSummary(summaryData);
      setTicketsByCategory(categoryData);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Cargando reportes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Reportes Agregados
        </h2>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.length > 0 ? (
          kpis.map((kpi) => (
            <ReportKpiCard key={kpi.id} kpi={kpi} />
          ))
        ) : (
          <>
            {summary && (
              <>
                <ReportKpiCard
                  kpi={{
                    id: "total-tickets",
                    label: "Total Tickets",
                    value: summary.totalTickets,
                    unit: "tickets",
                  }}
                />
                <ReportKpiCard
                  kpi={{
                    id: "open-tickets",
                    label: "Tickets Abiertos",
                    value: summary.openTickets,
                    unit: "tickets",
                  }}
                />
                <ReportKpiCard
                  kpi={{
                    id: "resolved-tickets",
                    label: "Tickets Resueltos",
                    value: summary.resolvedTickets,
                    unit: "tickets",
                  }}
                />
                <ReportKpiCard
                  kpi={{
                    id: "total-assets",
                    label: "Total Activos",
                    value: summary.totalAssets,
                    unit: "activos",
                  }}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tickets by Category Chart */}
        <TicketsByCategoryChart data={ticketsByCategory} />

        {/* Top Assets with Incidents */}
        {summary?.topAssetsWithIncidents && summary.topAssetsWithIncidents.length > 0 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Activos con Más Incidencias
            </h3>
            <div className="space-y-3">
              {summary.topAssetsWithIncidents.map((asset, index) => (
                <div
                  key={asset.assetId}
                  className="flex items-center justify-between rounded bg-gray-50 p-3"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs">
                      {index + 1}
                    </span>
                    {asset.assetName}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {asset.incidentCount} incidencias
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}