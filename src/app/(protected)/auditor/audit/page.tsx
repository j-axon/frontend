"use client";

import * as React from "react";
import { useAuditLogs } from "@/hooks/use-audit-logs";
import { AuditFilters, type AuditFiltersValue } from "@features/audit/components/AuditFilters";
import { AuditLogsTable } from "@features/audit/components/AuditLogsTable";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function AuditLogsPage() {
  return (
    <RoleGuard roles={[ROLES.AUDITOR, ROLES.ADMIN]}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const [filters, setFilters] = React.useState<AuditFiltersValue>({});
  const q = useAuditLogs(filters as Record<string, string | undefined>);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold text-fg">Auditoría</h1>
        <p className="text-sm text-fg-soft">Solo lectura. Filtra por actor, acción y rango de fechas.</p>
      </header>

      <AuditFilters initial={filters} onApply={setFilters} />

      {q.isLoading && <LoadingState label="Cargando logs..." />}
      {q.isError && (
        <ErrorState onRetry={() => q.refetch()} message="No se pudieron cargar los logs." />
      )}
      {q.data && <AuditLogsTable logs={q.data} />}
    </div>
  );
}
