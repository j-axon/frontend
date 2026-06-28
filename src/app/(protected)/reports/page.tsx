"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";

type AuditLog = {
  id: string;
  actorEmail: string;
  action: string;
  resource: string;
  httpMethod: string;
  path: string;
  status: string;
  timestamp: string;
};

// Backend returns a bare array (not a paginated envelope).

const REPORT_CARDS = [
  {
    title: "Log de auditoría",
    description: "Eventos del sistema: quién hizo qué y cuándo.",
    href: "#audit",
    backendAvailable: true,
  },
  {
    title: "Resumen de tickets",
    description: "Tickets abiertos / cerrados / por técnico / por categoría.",
    href: "#",
    backendAvailable: false,
  },
  {
    title: "Inventario y asignaciones",
    description: "Conteo de activos por estado y responsable.",
    href: "#",
    backendAvailable: false,
  },
  {
    title: "Telemetría de agentes",
    description: "Estado de los collectors desplegados.",
    href: "#",
    backendAvailable: false,
  },
];

export default function ReportsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: () => httpClient<AuditLog[]>("/v1/audit/logs"),
    staleTime: 20_000,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Reportes</h1>
        <p className="text-sm text-slate-600">
          Vistas de análisis y auditoría del sistema.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Disponibles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORT_CARDS.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col gap-2 rounded-xl border bg-white p-5 shadow-sm ${
                card.backendAvailable ? "border-slate-200" : "border-dashed border-slate-300 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                {!card.backendAvailable && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="flex-1 text-sm text-slate-600">{card.description}</p>
              {card.backendAvailable ? (
                <Link
                  href={card.href}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Ver abajo →
                </Link>
              ) : (
                <span className="text-xs text-slate-500">
                  Endpoint backend no expuesto todavía
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="audit">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Log de auditoría
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-6 text-sm text-slate-500">Cargando log…</div>
          ) : isError ? (
            <div className="p-6 text-sm text-rose-700">
              No se pudo cargar el log de auditoría.
            </div>
          ) : !data || data.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-600">
              No hay eventos registrados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="p-3 font-medium">Cuándo</th>
                    <th className="p-3 font-medium">Actor</th>
                    <th className="p-3 font-medium">Acción</th>
                    <th className="p-3 font-medium">Recurso</th>
                    <th className="p-3 font-medium">HTTP</th>
                    <th className="p-3 font-medium">Ruta</th>
                    <th className="p-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 text-xs text-slate-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 text-slate-700">{log.actorEmail}</td>
                      <td className="p-3 font-medium text-slate-900">{log.action}</td>
                      <td className="p-3 text-slate-700">{log.resource}</td>
                      <td className="p-3 font-mono text-xs text-slate-500">{log.httpMethod}</td>
                      <td className="p-3 font-mono text-xs text-slate-500">{log.path}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            log.status === "SUCCESS" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}