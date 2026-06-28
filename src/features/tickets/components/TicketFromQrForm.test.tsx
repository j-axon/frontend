import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TicketFromQrForm } from "./TicketFromQrForm";
import { AssetQrResponse } from "@/features/assets/types/asset-qr.types";
import { HttpError } from "@/lib/api/http-error";
import * as ticketService from "../services/ticket.service";

vi.mock("../services/ticket.service");

const mockAsset: AssetQrResponse = {
  id: "asset-uuid-1",
  name: "Servidor Principal",
  code: "AST-001",
  status: "ACTIVE",
  serialNumber: "SN-12345",
};

describe("TicketFromQrForm — CP-FE-TICKET-001", () => {
  beforeEach(() => {
    vi.mocked(ticketService.createTicket).mockResolvedValue({
      id: "ticket-1",
      message: "Ticket created",
    });
  });

  it("renderiza el formulario con datos del activo precargados", () => {
    render(<TicketFromQrForm asset={mockAsset} />);

    expect(screen.getByTestId("ticket-from-qr-form")).toBeInTheDocument();
    expect(screen.getByTestId("asset-field-name")).toHaveValue("Servidor Principal");
    expect(screen.getByText("Reportar Falla")).toBeInTheDocument();
  });
});

describe("TicketFromQrForm — CP-FE-TICKET-002", () => {
  beforeEach(() => {
    vi.mocked(ticketService.createTicket).mockResolvedValue({
      id: "ticket-1",
      message: "Ticket created",
    });
  });

  it("valida que la descripción tenga al menos 10 caracteres", async () => {
    const user = userEvent.setup();
    render(<TicketFromQrForm asset={mockAsset} />);

    await user.type(screen.getByLabelText(/Descripción/i), "corta");
    await user.selectOptions(screen.getByLabelText(/Categoría/i), "Mantenimiento");
    await user.click(screen.getByRole("button", { name: /Crear Ticket/i }));

    expect(
      await screen.findByText("La descripción debe tener al menos 10 caracteres")
    ).toBeInTheDocument();
    expect(ticketService.createTicket).not.toHaveBeenCalled();
  });

  it("muestra confirmación tras envío exitoso", async () => {
    const user = userEvent.setup();
    render(<TicketFromQrForm asset={mockAsset} />);

    await user.type(
      screen.getByLabelText(/Descripción/i),
      "El equipo presenta fallas intermitentes de conexión"
    );
    await user.selectOptions(screen.getByLabelText(/Categoría/i), "Mantenimiento");
    await user.click(screen.getByRole("button", { name: /Crear Ticket/i }));

    await waitFor(() => {
      expect(screen.getByTestId("ticket-success-message")).toBeInTheDocument();
    });
    expect(ticketService.createTicket).toHaveBeenCalledWith(
      expect.objectContaining({
        assetUuid: "asset-uuid-1",
        description: "El equipo presenta fallas intermitentes de conexión",
        category: "Mantenimiento",
      })
    );
  });

  it("muestra mensaje genérico en error 403 sin datos sensibles", async () => {
    vi.mocked(ticketService.createTicket).mockRejectedValue(
      new HttpError(403, "HTTP error 403")
    );

    const user = userEvent.setup();
    render(<TicketFromQrForm asset={mockAsset} />);

    await user.type(
      screen.getByLabelText(/Descripción/i),
      "Descripción válida de la falla reportada"
    );
    await user.selectOptions(screen.getByLabelText(/Categoría/i), "Otros");
    await user.click(screen.getByRole("button", { name: /Crear Ticket/i }));

    const errorBanner = await screen.findByTestId("ticket-submit-error");
    expect(errorBanner).toHaveTextContent("No tienes permisos");
    expect(errorBanner).not.toHaveTextContent("403");
    expect(errorBanner).not.toHaveTextContent("asset-uuid-1");
  });
});
