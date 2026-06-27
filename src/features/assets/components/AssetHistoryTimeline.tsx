export type AssetHistoryEvent = {
  id: string;
  type: "ASSIGNMENT" | "TICKET" | "MAINTENANCE" | "STATUS_CHANGE";
  description: string;
  createdAt: string;
  user?: {
    name: string;
  };
};

type AssetHistoryTimelineProps = {
  events: AssetHistoryEvent[];
};

function getEventIcon(type: AssetHistoryEvent["type"]): string {
  switch (type) {
    case "ASSIGNMENT":
      return "👤";
    case "TICKET":
      return "🎫";
    case "MAINTENANCE":
      return "🔧";
    case "STATUS_CHANGE":
      return "📋";
    default:
      return "📌";
  }
}

function getEventLabel(type: AssetHistoryEvent["type"]): string {
  switch (type) {
    case "ASSIGNMENT":
      return "Asignación";
    case "TICKET":
      return "Ticket";
    case "MAINTENANCE":
      return "Mantenimiento";
    case "STATUS_CHANGE":
      return "Cambio de estado";
    default:
      return "Evento";
  }
}

export function AssetHistoryTimeline({ events }: AssetHistoryTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        No hay historial disponible para este activo.
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Historial del activo</h3>
      <div className="space-y-4">
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg">
                {getEventIcon(event.type)}
              </div>
              {index < sortedEvents.length - 1 && (
                <div className="w-0.5 flex-1 bg-slate-200 my-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-slate-900">
                  {getEventLabel(event.type)}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(event.createdAt).toLocaleString("es-CO", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </span>
              </div>
              <p className="text-sm text-slate-600">{event.description}</p>
              {event.user && (
                <p className="text-xs text-slate-500 mt-1">Por: {event.user.name}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
