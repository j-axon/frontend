import { TicketDetailPanel } from "@/features/tickets/components/TicketDetailPanel";

interface TechnicianTicketDetailPageProps {
  params: {
    ticketId: string;
  };
}

export default function TechnicianTicketDetailPage({ params }: TechnicianTicketDetailPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Detalle del ticket</h1>
        <p className="text-sm text-slate-600">Información completa del ticket, activo asociado y diagnóstico IA.</p>
      </header>

      <TicketDetailPanel ticketId={params.ticketId} />
    </main>
  );
}
