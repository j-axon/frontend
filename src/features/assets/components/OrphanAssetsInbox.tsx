"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAssetsService } from "@/features/assets/services/admin-assets.service";

export function OrphanAssetsInbox() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orphan-assets"],
    queryFn: adminAssetsService.fetchOrphanAssets,
    staleTime: 20_000
  });

  const adoptMutation = useMutation({
    mutationFn: adminAssetsService.adoptAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orphan-assets"] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: adminAssetsService.rejectAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orphan-assets"] });
    }
  });

  if (isLoading) {
    return <p className="text-sm text-slate-600">Cargando activos huérfanos...</p>;
  }

  if (isError) {
    return (
      <div className="grid gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm text-rose-700">No fue posible cargar los activos huérfanos.</p>
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
        No hay activos huérfanos pendientes de revisión.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((asset) => (
        <div
          key={asset.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3">
            <p className="text-xs text-slate-500">{asset.code}</p>
            <h3 className="text-base font-semibold text-slate-900">{asset.name}</h3>
            {asset.description && (
              <p className="text-sm text-slate-600 mt-1">{asset.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <span>Descubierto: {new Date(asset.discoveredAt).toLocaleString("es-CO", {
              dateStyle: "medium",
              timeStyle: "short"
            })}</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void adoptMutation.mutate(asset.id)}
              disabled={adoptMutation.isPending}
              className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
            >
              {adoptMutation.isPending ? "Procesando..." : "Adoptar"}
            </button>
            <button
              type="button"
              onClick={() => void rejectMutation.mutate(asset.id)}
              disabled={rejectMutation.isPending}
              className="rounded-md border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs text-rose-800 hover:bg-rose-100 disabled:opacity-50"
            >
              {rejectMutation.isPending ? "Procesando..." : "Rechazar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
