import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">J-AXON</h1>
        <p className="mt-2 text-xs text-gray-500">
          Help Desk, inventario inteligente, escaneo QR y diagnósticos asistidos por IA.
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99]"
          href="/login"
        >
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
