import { MyTicketsList } from "@/features/tickets/components/MyTicketsList";

export default function MyTicketsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Mis tickets</h1>
        <p className="text-sm text-slate-600">Seguimiento de tus solicitudes de soporte y sus actualizaciones.</p>
      </header>

      <MyTicketsList />
    </main>
  );
}
