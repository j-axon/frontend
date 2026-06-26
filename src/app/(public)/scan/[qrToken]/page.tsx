type ScanPageProps = {
  params: Promise<{
    qrToken: string;
  }>;
};

export default async function ScanQrPage({ params }: ScanPageProps) {
  const { qrToken } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Crear Ticket via QR</h1>
        <p className="mt-2 text-xs text-gray-500">
          Token QR recibido: {qrToken}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          La información del activo público se cargará aquí.
        </p>
      </div>
    </main>
  );
}
