import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyTicketsList } from "@/features/tickets/components/MyTicketsList";

const useMyTicketsMock = vi.fn();

vi.mock("@/features/tickets/hooks/useMyTickets", () => ({
  useMyTickets: () => useMyTicketsMock()
}));

vi.mock("@/hooks/use-websocket", () => ({
  useWebSocketSubscription: vi.fn(() => ({ connected: true }))
}));

function renderWithQuery(ui: React.ReactNode) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe("MyTicketsList", () => {
  it("muestra estado vacio", () => {
    useMyTicketsMock.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: vi.fn()
    });

    renderWithQuery(<MyTicketsList />);

    expect(screen.getByText("No tienes tickets registrados para este filtro.")).toBeInTheDocument();
  });

  it("filtra listado por estado", () => {
    useMyTicketsMock.mockReturnValue({
      data: [
        {
          id: "1",
          code: "TCK-1",
          title: "Incidencia red",
          status: "OPEN",
          createdAt: "2026-06-27T10:00:00.000Z",
          asset: { id: "a1", code: "SW-1", name: "Switch core" }
        },
        {
          id: "2",
          code: "TCK-2",
          title: "Falla monitor",
          status: "CLOSED",
          createdAt: "2026-06-27T11:00:00.000Z",
          asset: { id: "a2", code: "PC-1", name: "PC soporte" }
        }
      ],
      isLoading: false,
      isError: false,
      refetch: vi.fn()
    });

    renderWithQuery(<MyTicketsList />);

    expect(screen.getByText("Incidencia red")).toBeInTheDocument();
    expect(screen.getByText("Falla monitor")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cerrados" }));

    expect(screen.queryByText("Incidencia red")).not.toBeInTheDocument();
    expect(screen.getByText("Falla monitor")).toBeInTheDocument();
  });
});
