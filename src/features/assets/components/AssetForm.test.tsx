import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssetForm } from "@/features/assets/components/AssetForm";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

vi.mock("@/features/assets/services/admin-assets.service", () => ({
  adminAssetsService: {
    createAsset: vi.fn()
  }
}));

describe("AssetForm", () => {
  it("muestra formulario de registro", () => {
    render(<AssetForm />);
    
    expect(screen.getByLabelText("Código *")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre *")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar activo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
  });

  it("valida campos requeridos", async () => {
    const user = userEvent.setup();
    render(<AssetForm />);
    
    const submitButton = screen.getByRole("button", { name: "Guardar activo" });
    await user.click(submitButton);
    
    expect(screen.getByLabelText("Código *")).toBeInvalid();
    expect(screen.getByLabelText("Nombre *")).toBeInvalid();
  });
});
