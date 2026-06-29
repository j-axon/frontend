import * as React from "react";
import { Card } from "@shared/components/ui/Card";
import { Badge } from "@shared/components/ui/Badge";
import type { AssetQrResponse } from "@features/assets/types/assets.types";

export function AssetReadonlyCard({ asset }: { asset: AssetQrResponse }) {
  return (
    <Card
      title="Activo identificado"
      description={`Código ${asset.code}`}
      actions={<Badge tone="info">{asset.status}</Badge>}
    >
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-fg-soft">Nombre</dt>
          <dd className="text-sm text-fg">{asset.name}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-soft">Asignado a</dt>
          <dd className="text-sm text-fg">
            {asset.assignedUsername ?? "Sin asignar"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-soft">Código inventario</dt>
          <dd className="font-mono text-sm text-fg">{asset.code}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-soft">Estado</dt>
          <dd>
            <Badge tone={asset.status === "ACTIVE" ? "success" : "warning"}>
              {asset.status}
            </Badge>
          </dd>
        </div>
      </dl>
    </Card>
  );
}
