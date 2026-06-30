"use client";

import { useQuery } from "@tanstack/react-query";
import { adminAssetsService } from "@/features/assets/services/admin-assets.service";
import { QrDownloadButton } from "@/features/assets/components/QrDownloadButton";

export function AssetAdminTable() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-assets"],
    queryFn: adminAssetsService.fetchAdminAssets,
    staleTime: 20_000
  });

  if (isLoading) {
    return <p className="text-sm text-slate-600">Cargando activos...</p>;
  }

  if (isError) {
    return (
      <div className="grid gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm text-rose-700">No fue posible cargar los activos.</p>
        <button
          className="w-fit rounded-md border border-rose-300 px-3 py-1.5 text-sm text-rose-800"
          onClick={() => void refetch()}
          type="button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        No hay activos registrados.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Código</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Nombre</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Estado</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">Asignado a</th>
              <th className="px-4 py-3 text-left font-medium text-slate-900">QR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{asset.code}</td>
                <td className="px-4 py-3 text-slate-600">{asset.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      asset.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-800"
                        : asset.status === "INACTIVE"
                        ? "bg-slate-100 text-slate-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {asset.status === "ACTIVE" && "Activo"}
                    {asset.status === "INACTIVE" && "Inactivo"}
                    {asset.status === "MAINTENANCE" && "Mantenimiento"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {asset.assignedTo ? asset.assignedTo.name : "-"}
                </td>
                <td className="px-4 py-3">
                  <QrDownloadButton assetId={asset.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
