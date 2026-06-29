"use client";

import * as React from "react";
import { useReportsBundle } from "@/hooks/use-reports";
import { TicketMetricsCards } from "@features/reports/components/TicketMetricsCards";
import { AssetsIncidentsChart } from "@features/reports/components/AssetsIncidentsChart";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function ReportsPage() {
  return (
    <RoleGuard roles={[ROLES.AUDITOR, ROLES.ADMIN]}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const [tickets, incidents] = useReportsBundle();

  if (tickets.isLoading || incidents.isLoading)
    return <LoadingState label="Generando reportes..." />;
  if (tickets.isError || incidents.isError)
    return <ErrorState onRetry={() => { tickets.refetch(); incidents.refetch(); }} />;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-fg">Reportes</h1>
        <p className="text-sm text-fg-soft">Solo lectura. Métricas agregadas del sistema.</p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-soft">
          Tickets
        </h2>
        {tickets.data && <TicketMetricsCards metrics={tickets.data} />}
      </section>

      <section>
        {incidents.data && <AssetsIncidentsChart data={incidents.data} />}
      </section>
    </div>
  );
}
