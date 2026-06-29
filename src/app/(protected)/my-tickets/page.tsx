"use client";

import * as React from "react";
import { useMyTickets } from "@features/tickets/hooks/useMyTickets";
import { MyTicketsTable } from "@features/tickets/components/MyTicketsTable";
import { NotificationBell } from "@features/notifications/components/NotificationBell";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function MyTicketsPage() {
  return (
    <RoleGuard roles={[ROLES.USUARIO, ROLES.ADMIN]}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const q = useMyTickets();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-fg">Mis tickets</h1>
          <p className="text-sm text-fg-soft">
            Seguimiento de tickets creados y sus estados.
          </p>
        </div>
        <NotificationBell />
      </header>

      {q.isLoading && <LoadingState label="Cargando tickets..." />}
      {q.isError && (
        <ErrorState
          message="No fue posible cargar tus tickets."
          onRetry={() => q.refetch()}
        />
      )}
      {q.data && <MyTicketsTable tickets={q.data} />}
    </div>
  );
}
