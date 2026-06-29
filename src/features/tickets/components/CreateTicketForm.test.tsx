import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { CreateTicketForm } from "@features/tickets/components/CreateTicketForm";

describe("CreateTicketForm", () => {
  it("muestra campos precargados con qrUuid", () => {
    const { getByLabelText, container } = renderWithProviders(
      <CreateTicketForm qrUuid="aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee" />
    );
    expect(getByLabelText(/título/i)).toBeInTheDocument();
    expect(getByLabelText(/descripción/i)).toBeInTheDocument();
    const hidden = container.querySelector('input[name="qrUuid"]') as HTMLInputElement;
    expect(hidden?.value).toBe("aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee");
  });

  it("valida descripción mínima al enviar", async () => {
    const { getByRole, findByText, getByLabelText } = renderWithProviders(
      <CreateTicketForm qrUuid="aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee" />
    );
    await userEvent.type(getByLabelText(/título/i), "Problema X");
    await userEvent.click(getByRole("button", { name: /crear ticket/i }));
    expect(await findByText(/mín\. 10 caracteres/i)).toBeInTheDocument();
  });
});
