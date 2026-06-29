"use client";

import { useState } from "react";
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

export default function ReportsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: () => httpClient<AuditLog[]>("/v1/audit/logs"),
    staleTime: 20_000,
  });
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (path: string, filename: string) => {
    setDownloading(path);
    try {
      const res = await fetch(`/api${path}`, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 md:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Reportes</h1>
        <p className="text-sm text-slate-600">
          Vistas de análisis, exportación CSV y log de auditoría.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Exportar datos
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ExportCard
            title="Tickets (CSV)"
            description="Listado completo de tickets con estado, prioridad y categoría."
            onExport={() => download("/v1/reports/tickets/export", "tickets.csv")}
            busy={downloading === "/v1/reports/tickets/export"}
          />
          <ExportCard
            title="Activos (CSV)"
            description="Listado completo de activos con marca, modelo y serial."
            onExport={() => download("/v1/reports/assets/export", "assets.csv")}
            busy={downloading === "/v1/reports/assets/export"}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Log de auditoría
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-6 text-sm text-slate-500">Cargando log…</div>
          ) : isError ? (
            <div className="p-6 text-sm text-rose-700">No se pudo cargar el log de auditoría.</div>
          ) : !data || data.length === 0 ? (
            <div className="p-6 text-sm text-slate-600">No hay eventos registrados.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="p-3 font-medium">Cuándo</th>
                    <th className="p-3 font-medium">Actor</th>
                    <th className="p-3 font-medium">Acción</th>
                    <th className="p-3 font-medium">HTTP</th>
                    <th className="p-3 font-medium">Ruta</th>
                    <th className="p-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.slice(0, 20).map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-3 text-slate-700">{log.actorEmail}</td>
                      <td className="p-3 font-medium text-slate-900">{log.action}</td>
                      <td className="p-3 font-mono text-xs text-slate-500">{log.httpMethod}</td>
                      <td className="p-3 font-mono text-xs text-slate-500">{log.path}</td>
                      <td className="p-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${log.status === "SUCCESS" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
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
    </main>
  );
}

function ExportCard({ title, description, onExport, busy }: {
  title: string;
  description: string;
  onExport: () => void;
  busy: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{description}</p>
      <button
        type="button"
        onClick={onExport}
        disabled={busy}
        className="mt-3 w-fit rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {busy ? "Descargando…" : "Descargar"}
      </button>
    </div>
  );
}