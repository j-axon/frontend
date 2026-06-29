"use client";

import * as React from "react";
import { useOrphans } from "@/hooks/use-orphans";
import { OrphansTable } from "@features/orphans/components/OrphansTable";
import { AdminAlertsPanel } from "@features/admin/alerts/components/AdminAlertsPanel";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function OrphansPage() {
  return (
    <RoleGuard roles={ROLES.ADMIN}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const q = useOrphans();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-fg">Activos huérfanos</h1>
        <p className="text-sm text-fg-soft">
          Activos sin asignar y alertas en tiempo real desde
          <code className="ml-1 rounded bg-bg-soft px-1">/topic/admin/alerts</code>.
        </p>
      </header>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-fg-soft">
          Alertas en vivo
        </h2>
        <AdminAlertsPanel />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-fg-soft">
          Pendientes de adopción
        </h2>
        {q.isLoading && <LoadingState label="Cargando huérfanos..." />}
        {q.isError && (
          <ErrorState onRetry={() => q.refetch()} message="No se pudieron cargar los huérfanos." />
        )}
        {q.data && <OrphansTable orphans={q.data} />}
      </section>
    </div>
  );
}
