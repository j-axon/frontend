import { render, screen } from "@testing-library/react";
import { AiDiagnosisCard } from "@/features/ai/components/AiDiagnosisCard";

describe("AiDiagnosisCard", () => {
  it("muestra estado vacio cuando no hay diagnostico", () => {
    render(<AiDiagnosisCard diagnosis={null} />);
    
    expect(screen.getByText("No hay diagnóstico IA disponible para este ticket.")).toBeInTheDocument();
  });

  it("muestra diagnostico con confianza y acciones", () => {
    const diagnosis = {
      id: "1",
      summary: "Posible falla en el disco duro",
      suggestedActions: ["Reemplazar disco", "Verificar cables"],
      confidence: 85,
      createdAt: "2026-06-27T10:00:00.000Z"
    };

    render(<AiDiagnosisCard diagnosis={diagnosis} />);
    
    expect(screen.getByText("Diagnóstico IA")).toBeInTheDocument();
    expect(screen.getByText("Posible falla en el disco duro")).toBeInTheDocument();
    expect(screen.getByText("Reemplazar disco")).toBeInTheDocument();
    expect(screen.getByText("Verificar cables")).toBeInTheDocument();
    expect(screen.getByTestId("confidence-badge")).toHaveTextContent("Alta (85%)");
    expect(screen.getByText(/Advertencia:/)).toBeInTheDocument();
  });
});
