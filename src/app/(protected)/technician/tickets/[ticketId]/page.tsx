"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useTicketDetail } from "@features/tickets/hooks/useTicketDetail";
import { TicketDetailPanel } from "@features/tickets/components/TicketDetailPanel";
import { AiDiagnosisCard } from "@features/ai/components/AiDiagnosisCard";
import { useLatestDiagnosis } from "@features/ai/hooks/useLatestDiagnosis";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function TechnicianTicketDetailPage() {
  return (
    <RoleGuard roles={[ROLES.TECNICO, ROLES.ADMIN]}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = params?.ticketId as string;
  const q = useTicketDetail(ticketId);
  const latest = useLatestDiagnosis(ticketId);

  if (q.isLoading) return <LoadingState label="Cargando ticket..." rows={2} />;
  if (q.isError || !q.data)
    return (
      <ErrorState
        title="Ticket no disponible"
        message="No encontramos este ticket o no tienes permisos para verlo."
        onRetry={() => q.refetch()}
      />
    );

  // Si el hook aún no resolvió (loading), pasamos undefined para no pisar
  // un resultado cacheado con `null`. Solo cuando ya tenemos respuesta
  // (null = sin caché, objeto = con caché) lo pasamos al card.
  const initialForCard = latest.isLoading
    ? undefined
    : (latest.data ?? null);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <TicketDetailPanel ticket={q.data} />
      <AiDiagnosisCard ticketId={q.data.id} initial={initialForCard} />
    </div>
  );
}