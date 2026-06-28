"use client";

import type { AuditLog } from "@/types/audit";

export type AuditLogTableProps = {
  logs: AuditLog[];
  isLoading?: boolean;
};

function formatAction(action: string): string {
  const actionLabels: Record<string, string> = {
    LOGIN: "Inicio de sesión",
    LOGOUT: "Cierre de sesión",
    TICKET_CREATE: "Crear ticket",
    TICKET_UPDATE: "Actualizar ticket",
    TICKET_DELETE: "Eliminar ticket",
    ASSET_CREATE: "Crear activo",
    ASSET_UPDATE: "Actualizar activo",
    ASSET_DELETE: "Eliminar activo",
    REPORT_VIEW: "Ver reporte",
  };
  return actionLabels[action] || action;
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AuditLogTable({ logs, isLoading }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Cargando registros...</div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-gray-50">
        <div className="text-gray-500">No se encontraron registros de auditoría</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Usuario</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Acción</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tipo Entidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Detalles</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">IP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{formatDate(log.timestamp)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{log.userName}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {formatAction(log.action)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{log.entityType}</td>
              <td className="max-w-xs px-6 py-4 text-sm text-gray-900 truncate">{log.details || "-"}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{log.ipAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}