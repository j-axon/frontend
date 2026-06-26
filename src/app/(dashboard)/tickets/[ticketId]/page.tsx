type TicketDetailPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { ticketId } = await params;

  return <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ticket {ticketId}</h1>;
}
