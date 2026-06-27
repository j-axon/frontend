import {
  getAssetFromSearchParams,
  hasRequiredAssetData,
  type SearchParamValue
} from "@/features/assets/types/asset-qr.types";
import { TicketFromQrForm } from "@/features/tickets/components/TicketFromQrForm";

type TicketScanPageProps = {
  searchParams: Promise<Record<string, SearchParamValue>>;
};

export default async function TicketScanPage({ searchParams }: TicketScanPageProps) {
  const params = await searchParams;
  const asset = getAssetFromSearchParams(params);

  if (!hasRequiredAssetData(asset)) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-3 p-6">
        <h1 className="text-2xl font-semibold text-slate-900">No se pudo cargar el activo</h1>
        <p className="text-slate-600">
          Escanea nuevamente el QR para traer los datos tecnicos requeridos antes de crear el ticket.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center p-6 md:p-8">
      <TicketFromQrForm asset={asset} />
    </main>
  );
}
