import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./utils/renderWithProviders";

describe("renderWithProviders", () => {
  it("renderiza un componente envuelto en QueryClientProvider", () => {
    const { getByText } = renderWithProviders(<div>Hola test</div>);
    expect(getByText("Hola test")).toBeInTheDocument();
  });
});
