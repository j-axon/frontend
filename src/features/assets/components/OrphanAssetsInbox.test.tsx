import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrphanAssetsInbox } from "@/features/assets/components/OrphanAssetsInbox";

const fetchOrphanAssetsMock = vi.fn();

vi.mock("@/features/assets/services/admin-assets.service", () => ({
  adminAssetsService: {
    fetchOrphanAssets: () => fetchOrphanAssetsMock(),
    adoptAsset: vi.fn(),
    rejectAsset: vi.fn()
  }
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

describe("OrphanAssetsInbox", () => {
  it("muestra estado vacio cuando no hay huerfanos", async () => {
    fetchOrphanAssetsMock.mockResolvedValue([]);

    renderWithQuery(<OrphanAssetsInbox />);

    expect(await screen.findByText("No hay activos huérfanos pendientes de revisión.")).toBeInTheDocument();
  });

  it("muestra lista de activos huerfanos con acciones", async () => {
    fetchOrphanAssetsMock.mockResolvedValue([
      {
        id: "1",
        code: "ORPH-1",
        name: "Laptop desconocida",
        description: "Encontrada en sala de reuniones",
        discoveredAt: "2026-06-27T10:00:00.000Z"
      }
    ]);

    renderWithQuery(<OrphanAssetsInbox />);

    expect(await screen.findByText("ORPH-1")).toBeInTheDocument();
    expect(await screen.findByText("Laptop desconocida")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Adoptar" })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Rechazar" })).toBeInTheDocument();
  });
});
