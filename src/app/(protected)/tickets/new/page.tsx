import { TicketFromQrForm } from "@/features/tickets/components/TicketFromQrForm";
import { getAssetByUuid } from "@/features/assets/services/asset-qr.service";
import { notFound } from "next/navigation";
import Link from "next/link";

type NewTicketPageProps = {
  searchParams: Promise<{
    assetId?: string;
    code?: string;
  }>;
};

export default async function NewTicketPage({ searchParams }: NewTicketPageProps) {
  const { assetId } = await searchParams;

  if (!assetId) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="text-3xl font-bold">Crear Ticket</h1>
        <p className="text-muted-foreground">
          No se recibió un activo. Escanea un código QR para continuar.
        </p>
        <Link
          href="/tickets/scan"
          className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Ir al escáner QR
        </Link>
      </div>
    );
  }

  try {
    const asset = await getAssetByUuid(assetId);

    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Crear Ticket desde QR</h1>
        <TicketFromQrForm asset={asset} />
      </div>
    );
  } catch {
    notFound();
  }
}
