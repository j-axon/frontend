import { AssetForm } from "@/features/assets/components/AssetForm";

export default function NewAssetPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Registrar nuevo activo</h1>
        <p className="text-sm text-slate-600">Agrega un nuevo activo al inventario del sistema.</p>
      </header>

      <AssetForm />
    </main>
  );
}
