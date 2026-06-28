import { TechnicianTicketQueue } from "@/features/tickets/components/TechnicianTicketQueue";

export default function TechnicianTicketsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Cola de tickets</h1>
        <p className="text-sm text-slate-600">Gestiona y atiende las solicitudes de soporte técnico.</p>
      </header>

      <TechnicianTicketQueue />
    </main>
  );
}
