import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TicketFromQrForm } from "@/features/tickets/components/TicketFromQrForm";
import { createTicketFromQr } from "@/features/tickets/services/ticket.service";

vi.mock("@/features/tickets/services/ticket.service", async () => {
  const actual = await vi.importActual("@/features/tickets/services/ticket.service");

  return {
    ...actual,
    createTicketFromQr: vi.fn()
  };
});

const mockedCreateTicketFromQr = vi.mocked(createTicketFromQr);

const baseAsset = {
  assetUuid: "asset-001",
  assetCode: "PC-01",
  assetName: "Laptop Recepcion",
  technicalType: "Laptop",
  model: "ThinkPad",
  serialNumber: "SN-123",
  location: "Piso 2"
};

describe("TicketFromQrForm", () => {
  it("muestra formulario con datos de activo precargados", () => {
    render(React.createElement(TicketFromQrForm, { asset: baseAsset }));

    expect(screen.getByDisplayValue("asset-001")).toHaveAttribute("readonly");
    expect(screen.getByDisplayValue("PC-01")).toHaveAttribute("readonly");
    expect(screen.getByDisplayValue("Laptop Recepcion")).toHaveAttribute("readonly");
  });

  it("valida que la descripcion tenga minimo 10 caracteres", async () => {
    render(React.createElement(TicketFromQrForm, { asset: baseAsset }));

    fireEvent.change(screen.getByLabelText("Descripcion de la falla"), {
      target: { value: "muy corto" }
    });
    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "HARDWARE" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Crear ticket" }));

    expect(
      await screen.findByText("La descripcion debe tener al menos 10 caracteres")
    ).toBeInTheDocument();
  });

  it("muestra confirmacion en envio exitoso", async () => {
    mockedCreateTicketFromQr.mockResolvedValueOnce({
      uuid: "ticket-001",
      codigo: "TCK-2026-0001",
      estado: "OPEN",
      createdAt: new Date().toISOString()
    });

    render(React.createElement(TicketFromQrForm, { asset: baseAsset }));

    fireEvent.change(screen.getByLabelText("Descripcion de la falla"), {
      target: { value: "La pantalla no enciende desde esta manana" }
    });
    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "HARDWARE" }
    });
    fireEvent.change(screen.getByLabelText("Prioridad"), {
      target: { value: "HIGH" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Crear ticket" }));

    await waitFor(() => {
      expect(mockedCreateTicketFromQr).toHaveBeenCalledWith({
        assetUuid: "asset-001",
        descripcion: "La pantalla no enciende desde esta manana",
        categoria: "HARDWARE",
        prioridad: "HIGH"
      });
    });

    expect(await screen.findByText(/Ticket creado correctamente/)).toBeInTheDocument();
  });
});
