import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuditLogTable } from "./AuditLogTable";
import type { AuditLog } from "@/types/audit";

const mockLogs: AuditLog[] = [
  {
    id: "1",
    userId: "user-1",
    userName: "Juan Pérez",
    action: "LOGIN",
    entityType: "USER",
    details: "Inicio de sesión exitoso",
    ipAddress: "192.168.1.1",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user-2",
    userName: "María García",
    action: "TICKET_CREATE",
    entityType: "TICKET",
    entityId: "ticket-1",
    details: "Creación de ticket de soporte",
    ipAddress: "192.168.1.2",
    timestamp: "2024-01-15T11:00:00Z",
  },
];

describe("AuditLogTable", () => {
  it("renders loading state", () => {
    render(<AuditLogTable logs={[]} isLoading={true} />);
    expect(screen.getByText("Cargando registros...")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<AuditLogTable logs={[]} isLoading={false} />);
    expect(screen.getByText("No se encontraron registros de auditoría")).toBeInTheDocument();
  });

  it("renders audit logs", () => {
    render(<AuditLogTable logs={mockLogs} isLoading={false} />);
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("María García")).toBeInTheDocument();
    expect(screen.getByText("Inicio de sesión")).toBeInTheDocument();
    expect(screen.getByText("Crear ticket")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<AuditLogTable logs={mockLogs} isLoading={false} />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByText("Usuario")).toBeInTheDocument();
    expect(screen.getByText("Acción")).toBeInTheDocument();
    expect(screen.getByText("Tipo Entidad")).toBeInTheDocument();
    expect(screen.getByText("Detalles")).toBeInTheDocument();
    expect(screen.getByText("IP")).toBeInTheDocument();
  });
});