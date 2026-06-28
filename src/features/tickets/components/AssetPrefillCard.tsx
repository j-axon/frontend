import { AssetQrResponse } from "@/features/assets/types/asset-qr.types";

interface AssetPrefillCardProps {
  asset: AssetQrResponse;
}

export function AssetPrefillCard({ asset }: AssetPrefillCardProps) {
  return (
    <div
      className="rounded-lg border bg-card p-6 shadow-sm"
      data-testid="asset-prefill-card"
    >
      <h2 className="mb-4 text-xl font-semibold">Información del Activo</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Nombre
          </label>
          <input
            type="text"
            value={asset.name}
            readOnly
            aria-readonly="true"
            data-testid="asset-field-name"
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Código
          </label>
          <input
            type="text"
            value={asset.code}
            readOnly
            aria-readonly="true"
            data-testid="asset-field-code"
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Número de Serie
          </label>
          <input
            type="text"
            value={asset.serialNumber ?? "N/A"}
            readOnly
            aria-readonly="true"
            data-testid="asset-field-serial"
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Estado
          </label>
          <input
            type="text"
            value={asset.status}
            readOnly
            aria-readonly="true"
            data-testid="asset-field-status"
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
