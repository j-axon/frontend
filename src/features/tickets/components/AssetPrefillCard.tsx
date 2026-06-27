import type { AssetQrPrefillData } from "@/features/assets/types/asset-qr.types";

type AssetPrefillCardProps = {
  asset: AssetQrPrefillData;
};

type ReadonlyFieldProps = {
  label: string;
  value?: string;
};

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <label className="grid gap-1 text-sm text-slate-700">
      <span className="font-medium text-slate-900">{label}</span>
      <input
        readOnly
        value={value || "N/D"}
        className="rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-slate-700"
      />
    </label>
  );
}

export function AssetPrefillCard({ asset }: AssetPrefillCardProps) {
  return (
    <section className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="text-lg font-semibold text-slate-900">Datos tecnicos del activo</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadonlyField label="UUID" value={asset.assetUuid} />
        <ReadonlyField label="Codigo" value={asset.assetCode} />
        <ReadonlyField label="Nombre" value={asset.assetName} />
        <ReadonlyField label="Tipo tecnico" value={asset.technicalType} />
        <ReadonlyField label="Modelo" value={asset.model} />
        <ReadonlyField label="Serial" value={asset.serialNumber} />
        <ReadonlyField label="Ubicacion" value={asset.location} />
      </div>
    </section>
  );
}
