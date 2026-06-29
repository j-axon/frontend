"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@shared/components/ui/Badge";
import type { Asset } from "@features/assets/types/assets.types";

export function AssetsTable({ assets }: { assets: Asset[] }) {
  if (assets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
        <p className="text-lg font-semibold text-fg">Sin activos</p>
        <p className="mt-1 text-sm text-fg-soft">
          Aún no hay activos en el inventario.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Listado de activos</caption>
        <thead className="bg-bg-soft text-left text-xs uppercase tracking-wide text-fg-soft">
          <tr>
            <th scope="col" className="px-4 py-3">Código</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Estado</th>
            <th scope="col" className="px-4 py-3">Asignado a</th>
            <th scope="col" className="px-4 py-3">QR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {assets.map((a) => (
            <tr key={a.id} className="bg-bg hover:bg-muted/40">
              <td className="px-4 py-3 font-mono text-xs">{a.code}</td>
              <td className="px-4 py-3 text-fg">{a.name}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </td>
              <td className="px-4 py-3 text-fg-soft">
                {a.assignedUsername ?? "Sin asignar"}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/assets/${a.id}`}
                  className="text-accent hover:underline"
                >
                  Ver QR
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function statusTone(s: Asset["status"]) {
  switch (s) {
    case "ACTIVE":
      return "success" as const;
    case "MAINTENANCE":
      return "warning" as const;
    case "ORPHAN":
      return "info" as const;
    default:
      return "neutral" as const;
  }
}
