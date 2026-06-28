"use client";

import type { AuditFilters, AuditAction } from "@/types/audit";

export type AuditFiltersProps = {
  filters: AuditFilters;
  onFilterChange: (filters: AuditFilters) => void;
};

const ACTION_OPTIONS: { value: AuditAction | ""; label: string }[] = [
  { value: "", label: "Todas las acciones" },
  { value: "LOGIN", label: "Inicio de sesión" },
  { value: "LOGOUT", label: "Cierre de sesión" },
  { value: "TICKET_CREATE", label: "Crear ticket" },
  { value: "TICKET_UPDATE", label: "Actualizar ticket" },
  { value: "TICKET_DELETE", label: "Eliminar ticket" },
  { value: "ASSET_CREATE", label: "Crear activo" },
  { value: "ASSET_UPDATE", label: "Actualizar activo" },
  { value: "ASSET_DELETE", label: "Eliminar activo" },
  { value: "REPORT_VIEW", label: "Ver reporte" },
];

const ENTITY_TYPE_OPTIONS: { value: "" | "TICKET" | "ASSET" | "USER" | "REPORT"; label: string }[] = [
  { value: "", label: "Todos los tipos" },
  { value: "TICKET", label: "Ticket" },
  { value: "ASSET", label: "Activo" },
  { value: "USER", label: "Usuario" },
  { value: "REPORT", label: "Reporte" },
];

export function AuditFilters({ filters, onFilterChange }: AuditFiltersProps) {
  const handleChange = (key: keyof AuditFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="action">
          Acción
        </label>
        <select
          id="action"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          value={filters.action || ""}
          onChange={(e) => handleChange("action", e.target.value)}
        >
          {ACTION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="entityType">
          Tipo de entidad
        </label>
        <select
          id="entityType"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          value={filters.entityType || ""}
          onChange={(e) => handleChange("entityType", e.target.value)}
        >
          {ENTITY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="startDate">
          Fecha desde
        </label>
        <input
          id="startDate"
          type="date"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          value={filters.startDate || ""}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="endDate">
          Fecha hasta
        </label>
        <input
          id="endDate"
          type="date"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          value={filters.endDate || ""}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );
}