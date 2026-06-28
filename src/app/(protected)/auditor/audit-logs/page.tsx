"use client";

import { useState, useEffect, useCallback } from "react";
import { AuditLogTable } from "@/features/audit/components/AuditLogTable";
import { AuditFilters } from "@/features/audit/components/AuditFilters";
import { getAuditLogs } from "@/features/audit/services/audit.service";
import type { AuditLog, AuditFilters as AuditFiltersType } from "@/types/audit";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<AuditFiltersType>({});
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAuditLogs({
        ...filters,
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      setLogs(response.data);
      setPagination((prev) => ({ ...prev, total: response.total }));
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFilterChange = (newFilters: AuditFiltersType) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Registros de Auditoría
        </h2>
      </div>

      <AuditFilters filters={filters} onFilterChange={handleFilterChange} />

      <AuditLogTable logs={logs} isLoading={isLoading} />

      {pagination.total > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Mostrando {logs.length} de {pagination.total} registros
          </span>
          <div className="flex gap-2">
            <button
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              Anterior
            </button>
            <span className="flex items-center px-3 py-1 text-sm text-gray-600">
              Página {pagination.page} de {totalPages}
            </span>
            <button
              className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
              disabled={pagination.page >= totalPages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}