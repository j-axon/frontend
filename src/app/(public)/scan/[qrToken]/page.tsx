type ScanQrPageProps = {
  params: Promise<{
    qrToken: string;
  }>;
};

export default async function ScanQrPage({ params }: ScanQrPageProps) {
  const { qrToken } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Crear ticket por QR</h1>
      <p>Token QR recibido: {qrToken}</p>
      <p>Aquí se cargará la información pública segura del activo.</p>
    </main>
  );
}
