import { render, screen } from "@testing-library/react";
import { ConfidenceIndicator } from "@/features/ai/components/ConfidenceIndicator";

describe("ConfidenceIndicator", () => {
  it("muestra indicador de confianza alta", () => {
    render(<ConfidenceIndicator confidence={85} />);
    
    expect(screen.getByTestId("confidence-badge")).toHaveTextContent("Alta (85%)");
  });

  it("muestra indicador de confianza media", () => {
    render(<ConfidenceIndicator confidence={65} />);
    
    expect(screen.getByTestId("confidence-badge")).toHaveTextContent("Media (65%)");
  });

  it("muestra indicador de confianza baja", () => {
    render(<ConfidenceIndicator confidence={45} />);
    
    expect(screen.getByTestId("confidence-badge")).toHaveTextContent("Baja (45%)");
  });
});
