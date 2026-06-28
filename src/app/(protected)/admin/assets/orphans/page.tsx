import { OrphanAssetsInbox } from "@/features/assets/components/OrphanAssetsInbox";

export default function OrphanAssetsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Activos huérfanos</h1>
        <p className="text-sm text-slate-600">Gestiona activos detectados sin asignación oficial. Adopta o rechaza según corresponda.</p>
      </header>

      <OrphanAssetsInbox />
    </main>
  );
}
