"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { ROUTES } from "@/constants/routes";

type TicketStatus = "ABIERTO" | "EN_PROGRESO" | "CERRADO" | "CANCELADO";
type TicketPriority = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

type TicketSummary = {
  id: string;
  code: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  requester: { id: string; name: string };
  assignee?: { id: string; name: string } | null;
};

type PagedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
};

const STATUS_STYLES: Record<TicketStatus, string> = {
  ABIERTO: "bg-blue-100 text-blue-800",
  EN_PROGRESO: "bg-amber-100 text-amber-800",
  CERRADO: "bg-emerald-100 text-emerald-800",
  CANCELADO: "bg-slate-100 text-slate-700",
};

const PRIORITY_STYLES: Record<TicketPriority, string> = {
  BAJA: "bg-slate-100 text-slate-700",
  MEDIA: "bg-blue-100 text-blue-800",
  ALTA: "bg-amber-100 text-amber-800",
  CRITICA: "bg-rose-100 text-rose-800",
};

const FILTERS: Array<{ label: string; value: TicketStatus | "TODOS" }> = [
  { label: "Todos", value: "TODOS" },
  { label: "Abiertos", value: "ABIERTO" },
  { label: "En progreso", value: "EN_PROGRESO" },
  { label: "Cerrados", value: "CERRADO" },
  { label: "Cancelados", value: "CANCELADO" },
];

export default function TicketsListPage() {
  const [filter, setFilter] = useState<TicketStatus | "TODOS">("TODOS");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tickets", filter],
    queryFn: () => httpClient<TicketSummary[]>("/v1/tickets/my"),
    staleTime: 20_000,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Tickets</h1>
          <p className="text-sm text-slate-600">
            Listado general de tickets reportados en el sistema.
          </p>
        </div>
        <Link
          href={ROUTES.ticketsNew}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Crear ticket
        </Link>
      </header>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              filter === f.value
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6 text-sm text-slate-500">Cargando tickets…</div>
        ) : isError ? (
          <div className="grid gap-3 p-6">
            <p className="text-sm text-rose-700">
              No fue posible cargar los tickets. El backend no expone
              <code className="mx-1 rounded bg-rose-100 px-1 py-0.5">GET /v1/tickets</code>
              todavía (devuelve 500).
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="w-fit rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Reintentar
            </button>
            <Link
              href={ROUTES.technicianTickets}
              className="w-fit rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Ir a la cola del técnico
            </Link>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="grid gap-2 p-8 text-center">
            <p className="text-sm text-slate-600">No hay tickets que mostrar.</p>
            <Link
              href={ROUTES.ticketsNew}
              className="mx-auto w-fit rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Crear el primero
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="p-3 font-medium">Código</th>
                  <th className="p-3 font-medium">Título</th>
                  <th className="p-3 font-medium">Estado</th>
                  <th className="p-3 font-medium">Prioridad</th>
                  <th className="p-3 font-medium">Solicitante</th>
                  <th className="p-3 font-medium">Asignado a</th>
                  <th className="p-3 font-medium">Creado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-700">{t.code}</td>
                    <td className="p-3 font-medium text-slate-900">{t.title}</td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{t.requester.name}</td>
                    <td className="p-3 text-slate-700">{t.assignee?.name ?? "—"}</td>
                    <td className="p-3 text-xs text-slate-500">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}