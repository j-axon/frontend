"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@shared/components/ui/Badge";
import { Button } from "@shared/components/ui/Button";
import { orphansService } from "@features/orphans/services/orphansService";
import type { Asset } from "@features/assets/types/assets.types";

export function OrphansTable({ orphans }: { orphans: Asset[] }) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => orphansService.adopt(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orphans"] })
  });

  if (orphans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-soft px-6 py-10 text-center">
        <p className="text-lg font-semibold text-fg">No hay huérfanos</p>
        <p className="mt-1 text-sm text-fg-soft">
          Todos los activos están asignados a un usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Activos sin asignar</caption>
        <thead className="bg-bg-soft text-left text-xs uppercase tracking-wide text-fg-soft">
          <tr>
            <th scope="col" className="px-4 py-3">Código</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Serial</th>
            <th scope="col" className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orphans.map((o) => (
            <tr key={o.id} className="bg-bg hover:bg-muted/40">
              <td className="px-4 py-3 font-mono text-xs">{o.code}</td>
              <td className="px-4 py-3 text-fg">{o.name}</td>
              <td className="px-4 py-3 text-fg-soft">{o.serialNumber ?? "—"}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Badge tone="info">HUÉRFANO</Badge>
                  <Button
                    size="sm"
                    onClick={() => mutation.mutate(o.id)}
                    loading={mutation.isPending && mutation.variables === o.id}
                  >
                    Adoptar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
