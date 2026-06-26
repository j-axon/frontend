import { Asset } from "@/types/asset";

interface AssetPrefillCardProps {
  asset: Asset;
}

export function AssetPrefillCard({ asset }: AssetPrefillCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
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
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Número de Serie
          </label>
          <input
            type="text"
            value={asset.serialNumber || "N/A"}
            readOnly
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
            className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
