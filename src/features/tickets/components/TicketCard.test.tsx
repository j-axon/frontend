import { render, screen } from "@testing-library/react";
import { TicketCard } from "@/features/tickets/components/TicketCard";

describe("TicketCard", () => {
  it("muestra estado y activo asociado", () => {
    render(
      <TicketCard
        ticket={{
          id: "t-1",
          code: "TCK-1",
          title: "Falla teclado",
          status: "IN_PROGRESS",
          createdAt: "2026-06-27T10:00:00.000Z",
          asset: {
            id: "a-1",
            code: "PC-01",
            name: "Equipo Recepcion"
          }
        }}
      />
    );

    expect(screen.getByText("TCK-1")).toBeInTheDocument();
    expect(screen.getByText("Falla teclado")).toBeInTheDocument();
    expect(screen.getByText(/Equipo Recepcion/)).toBeInTheDocument();
    expect(screen.getByTestId("ticket-status-badge")).toHaveTextContent("En progreso");
  });
});
