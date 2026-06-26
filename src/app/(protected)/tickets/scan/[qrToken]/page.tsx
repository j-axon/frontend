import { TicketFromQrForm } from "@/features/tickets/components/TicketFromQrForm";
import { getAssetByQrToken } from "@/features/assets/services/asset.service";

type ScanQrPageProps = {
  params: Promise<{
    qrToken: string;
  }>;
};

export default async function ScanQrPage({ params }: ScanQrPageProps) {
  const { qrToken } = await params;
  const asset = await getAssetByQrToken(qrToken);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Crear Ticket desde QR</h1>
      <TicketFromQrForm asset={asset} />
    </div>
  );
}
