import * as React from "react";
import { Card } from "@shared/components/ui/Card";
import { Button } from "@shared/components/ui/Button";
import type { AssetQrResponse } from "@features/assets/types/assets.types";

export function AssetQrCard({ asset }: { asset: AssetQrResponse }) {
  const qrUrl = asset.qrUrl ?? "";
  return (
    <Card title="QR del activo" description={`Código ${asset.code}`}>
      <div className="flex flex-col items-center gap-4">
        {qrUrl ? (
          <img
            src={qrUrl}
            alt={`QR del activo ${asset.code}`}
            className="h-56 w-56 rounded-lg border border-border bg-white p-2"
          />
        ) : (
          <div className="flex h-56 w-56 items-center justify-center rounded-lg border border-dashed border-border text-xs text-fg-soft">
            QR no disponible
          </div>
        )}
        <div className="flex gap-2">
          {qrUrl && (
            <a href={qrUrl} download={`asset-${asset.code}.png`}>
              <Button variant="outline">Descargar QR</Button>
            </a>
          )}
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            Copiar enlace
          </Button>
        </div>
      </div>
    </Card>
  );
}
