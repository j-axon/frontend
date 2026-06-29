"use client";

import * as React from "react";
import { useTechnicianQueue } from "@features/tickets/hooks/useTechnicianQueue";
import { TechnicianQueue } from "@features/tickets/components/TechnicianQueue";
import { NotificationBell } from "@features/notifications/components/NotificationBell";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function TechnicianTicketsPage() {
  return (
    <RoleGuard roles={[ROLES.TECNICO, ROLES.ADMIN]}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const q = useTechnicianQueue();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-fg">Cola de tickets</h1>
          <p className="text-sm text-fg-soft">
            Tickets a resolver. Actualiza cada 30 segundos; las notificaciones
            push también te avisan.
          </p>
        </div>
        <NotificationBell />
      </header>

      {q.isLoading && <LoadingState label="Cargando cola..." />}
      {q.isError && (
        <ErrorState onRetry={() => q.refetch()} message="No se pudo cargar la cola." />
      )}
      {q.data && <TechnicianQueue tickets={q.data} />}
    </div>
  );
}
