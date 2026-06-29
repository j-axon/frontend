import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { MyTicketsTable } from "@features/tickets/components/MyTicketsTable";
import type { Ticket } from "@features/tickets/types/tickets.types";

const tickets: Ticket[] = [
  {
    id: "1",
    code: "TC-1",
    title: "Pantalla rota",
    description: "...",
    status: "OPEN",
    priority: "HIGH",
    category: "HARDWARE",
    reporterId: "u",
    reporterName: "User",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

describe("MyTicketsTable", () => {
  it("renderiza los tickets con su código y estado", () => {
    const { getByText } = renderWithProviders(<MyTicketsTable tickets={tickets} />);
    expect(getByText("TC-1")).toBeInTheDocument();
    expect(getByText("Pantalla rota")).toBeInTheDocument();
  });

  it("muestra empty state cuando no hay tickets", () => {
    const { getByText } = renderWithProviders(<MyTicketsTable tickets={[]} />);
    expect(getByText(/aún no tienes tickets/i)).toBeInTheDocument();
  });
});
