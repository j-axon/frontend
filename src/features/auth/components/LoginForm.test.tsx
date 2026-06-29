import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { LoginForm } from "@features/auth/components/LoginForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn() })
}));

describe("LoginForm", () => {
  it("muestra errores de validación cuando los campos están vacíos", async () => {
    const { getByRole, findByText } = renderWithProviders(<LoginForm />);
    await userEvent.click(getByRole("button", { name: /iniciar sesión/i }));
    expect(await findByText(/ingresa un correo válido/i)).toBeInTheDocument();
    expect(await findByText(/al menos 6 caracteres/i)).toBeInTheDocument();
  });

  it("renderiza los campos de email y contraseña", () => {
    const { getByLabelText } = renderWithProviders(<LoginForm />);
    expect(getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(getByLabelText(/contraseña/i)).toBeInTheDocument();
  });
});
