"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { httpClient } from "@/lib/api/http-client";
import { TicketStatusBadge } from "@/features/tickets/components/TicketStatusBadge";
import { AssetHistoryTimeline, type AssetHistoryEvent } from "@/features/assets/components/AssetHistoryTimeline";
import { AiDiagnosisCard, type AiDiagnosis } from "@/features/ai/components/AiDiagnosisCard";
import { ticketService } from "@/features/tickets/services/ticket.service";
import type { TicketStatus } from "@/types/ticket";

type TicketDetailPanelProps = {
  ticketId: string;
};

type TicketDetail = {
  id: string;
  code: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  asset: {
    id: string;
    code: string;
    name: string;
    description?: string;
  };
  owner: {
    id: string;
    name: string;
  };
};

async function fetchTicketDetail(ticketId: string): Promise<TicketDetail> {
  return httpClient(`/v1/tickets/${ticketId}`);
}

async function fetchAssetHistory(assetId: string): Promise<AssetHistoryEvent[]> {
  const response = await httpClient<{ items: AssetHistoryEvent[] }>(`/v1/assets/${assetId}/history`);
  return response.items;
}

async function fetchAiDiagnosis(ticketId: string): Promise<AiDiagnosis | null> {
  try {
    return await httpClient(`/v1/tickets/${ticketId}/diagnosis`);
  } catch {
    return null;
  }
}

export function TicketDetailPanel({ ticketId }: TicketDetailPanelProps) {
  const { data: ticket, isLoading: isLoadingTicket, isError: isTicketError } = useQuery({
    queryKey: ["ticket-detail", ticketId],
    queryFn: () => fetchTicketDetail(ticketId),
    enabled: !!ticketId
  });

  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["asset-history", ticket?.asset.id],
    queryFn: () => fetchAssetHistory(ticket!.asset.id),
    enabled: !!ticket?.asset.id
  });

  const { data: diagnosis, isLoading: isLoadingDiagnosis } = useQuery({
    queryKey: ["ai-diagnosis", ticketId],
    queryFn: () => fetchAiDiagnosis(ticketId),
    enabled: !!ticketId
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    setIsUpdating(true);
    try {
      await ticketService.updateTicketStatus(ticket.id, newStatus);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingTicket) {
    return <p className="text-sm text-slate-600">Cargando detalle del ticket...</p>;
  }

  if (isTicketError || !ticket) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm text-rose-700">No fue posible cargar el detalle del ticket.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-slate-500">{ticket.code}</p>
              <h2 className="text-xl font-semibold text-slate-900">{ticket.title}</h2>
            </div>
            <TicketStatusBadge status={ticket.status} />
          </div>

          <div className="mb-4 space-y-2 text-sm">
            <p className="text-slate-600">{ticket.description}</p>
          </div>

          <div className="grid gap-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <p>
              <span className="font-medium text-slate-900">Solicitante:</span> {ticket.owner.name}
            </p>
            <p>
              <span className="font-medium text-slate-900">Creado:</span> {new Date(ticket.createdAt).toLocaleString("es-CO", {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </p>
            <p>
              <span className="font-medium text-slate-900">Actualizado:</span> {new Date(ticket.updatedAt).toLocaleString("es-CO", {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <label className="block text-sm font-medium text-slate-900 mb-2">Cambiar estado:</label>
            <div className="flex flex-wrap gap-2">
              {(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"] as TicketStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => void handleStatusChange(status)}
                  disabled={isUpdating || ticket.status === status}
                  className={`rounded-md border px-3 py-1.5 text-xs ${
                    ticket.status === status
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  } disabled:opacity-50`}
                >
                  {status === "OPEN" && "Abierto"}
                  {status === "IN_PROGRESS" && "En progreso"}
                  {status === "RESOLVED" && "Resuelto"}
                  {status === "CLOSED" && "Cerrado"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Activo asociado</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-900">Código:</span> {ticket.asset.code}
            </p>
            <p>
              <span className="font-medium text-slate-900">Nombre:</span> {ticket.asset.name}
            </p>
            {ticket.asset.description && (
              <p>
                <span className="font-medium text-slate-900">Descripción:</span> {ticket.asset.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {isLoadingDiagnosis ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            Cargando diagnóstico IA...
          </div>
        ) : (
          <AiDiagnosisCard diagnosis={diagnosis ?? null} />
        )}

        {isLoadingHistory ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            Cargando historial del activo...
          </div>
        ) : (
          <AssetHistoryTimeline events={history || []} />
        )}
      </section>
    </div>
  );
}
