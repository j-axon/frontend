"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";
import { ROUTES } from "@/constants/routes";

type AssetSummary = {
  id: string;
  code: string;
  name: string;
  type: string;
  status: "ACTIVO" | "INACTIVO" | "MANTENIMIENTO" | "BAJA";
  assignee?: { id: string; name: string } | null;
  serialNumber?: string;
  createdAt: string;
};

type PagedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
};

const STATUS_STYLES: Record<AssetSummary["status"], string> = {
  ACTIVO: "bg-emerald-100 text-emerald-800",
  INACTIVO: "bg-slate-100 text-slate-700",
  MANTENIMIENTO: "bg-amber-100 text-amber-800",
  BAJA: "bg-rose-100 text-rose-800",
};

export default function AssetsListPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: () => httpClient<PagedResponse<AssetSummary>>("/v1/assets"),
    staleTime: 20_000,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Activos</h1>
          <p className="text-sm text-slate-600">
            Inventario general de activos registrados en el sistema.
          </p>
        </div>
        {data?.total !== undefined && (
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
            {data.total} activos
          </span>
        )}
      </header>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-6 text-sm text-slate-500">Cargando activos…</div>
        ) : isError ? (
          <div className="grid gap-3 p-6">
            <p className="text-sm text-rose-700">
              No fue posible cargar el inventario. El backend no expone
              <code className="mx-1 rounded bg-rose-100 px-1 py-0.5">GET /v1/assets</code>
              todavía (devuelve 500).
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void refetch()}
                className="w-fit rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Reintentar
              </button>
              <Link
                href={ROUTES.adminAssetsNew}
                className="w-fit rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                Registrar activo nuevo
              </Link>
            </div>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="grid gap-2 p-8 text-center">
            <p className="text-sm text-slate-600">No hay activos registrados.</p>
            <Link
              href={ROUTES.adminAssetsNew}
              className="mx-auto w-fit rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Registrar el primero
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="p-3 font-medium">Código</th>
                  <th className="p-3 font-medium">Nombre</th>
                  <th className="p-3 font-medium">Tipo</th>
                  <th className="p-3 font-medium">Estado</th>
                  <th className="p-3 font-medium">Asignado a</th>
                  <th className="p-3 font-medium">Serial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.items.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-700">{a.code}</td>
                    <td className="p-3 font-medium text-slate-900">{a.name}</td>
                    <td className="p-3 text-slate-700">{a.type}</td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{a.assignee?.name ?? "—"}</td>
                    <td className="p-3 font-mono text-xs text-slate-500">{a.serialNumber ?? "—"}</td>
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