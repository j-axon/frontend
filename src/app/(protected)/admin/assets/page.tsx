import { AssetAdminTable } from "@/features/assets/components/AssetAdminTable";

export default function AdminAssetsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Gestión de activos</h1>
        <p className="text-sm text-slate-600">Administra el inventario de activos, genera QR y asignaciones.</p>
      </header>

      <AssetAdminTable />
    </main>
  );
}
