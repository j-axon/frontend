"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/api/http-client";

type AssetDetail = {
  id: string;
  codigoInventario: string;
  nombre: string;
  tipo: string | null;
  marca: string | null;
  modelo: string | null;
  serial: string | null;
  ubicacion: string | null;
  estado: string;
  qrUuid: string;
  qrUrl: string | null;
  creadoEn: string;
  actualizadoEn: string;
};

const ESTADO_STYLES: Record<string, string> = {
  DISPONIBLE: "bg-emerald-100 text-emerald-800",
  ASIGNADO: "bg-blue-100 text-blue-800",
  MANTENIMIENTO: "bg-amber-100 text-amber-800",
  BAJA: "bg-rose-100 text-rose-800",
};

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-900">{value && value.trim() ? value : <span className="text-slate-400">—</span>}</p>
    </div>
  );
}

export default function AssetDetailPage() {
  const params = useParams<{ assetId: string }>();
  const assetId = params.assetId;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => httpClient<AssetDetail>(`/v1/assets/${assetId}`),
    enabled: !!assetId,
  });

  if (isLoading) {
    return <main className="mx-auto max-w-4xl p-6 text-sm text-slate-500">Cargando activo…</main>;
  }
  if (isError || !data) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <p className="text-sm text-rose-700">No fue posible cargar el activo.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-3 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Reintentar
        </button>
      </main>
    );
  }

  const estadoClass = ESTADO_STYLES[data.estado] ?? "bg-slate-100 text-slate-700";

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/assets"
            className="text-sm text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            ← Inventario
          </Link>
          <span className="font-mono text-xs text-slate-500">{data.codigoInventario}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/assets/${data.id}/edit`}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => {
              const url = `/v1/assets/${data.id}/qr`;
              window.open(url, "_blank");
            }}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Descargar QR
          </button>
        </div>
      </div>

      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{data.nombre}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${estadoClass}`}>
            {data.estado}
          </span>
          {data.tipo && (
            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {data.tipo}
            </span>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Detalles
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Código" value={data.codigoInventario} />
          <Field label="Nombre" value={data.nombre} />
          <Field label="Tipo" value={data.tipo} />
          <Field label="Marca" value={data.marca} />
          <Field label="Modelo" value={data.modelo} />
          <Field label="Serial" value={data.serial} />
          <Field label="Ubicación" value={data.ubicacion} />
          <Field label="Creado" value={new Date(data.creadoEn).toLocaleString()} />
          <Field label="Actualizado" value={new Date(data.actualizadoEn).toLocaleString()} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Código QR
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs text-slate-500">UUID público del QR</p>
          <p className="mt-1 font-mono text-sm text-slate-900 break-all">{data.qrUuid}</p>
        </div>
      </section>
    </main>
  );
}