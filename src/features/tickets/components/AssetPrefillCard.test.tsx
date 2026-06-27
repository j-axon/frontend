import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AssetPrefillCard } from "./AssetPrefillCard";
import { AssetQrResponse } from "@/features/assets/types/asset-qr.types";

const mockAsset: AssetQrResponse = {
  id: "asset-uuid-1",
  name: "Servidor Principal",
  code: "AST-001",
  status: "ACTIVE",
  serialNumber: "SN-12345",
};

describe("AssetPrefillCard — CP-FE-TICKET-001", () => {
  it("muestra los datos del activo precargados y no editables", () => {
    render(<AssetPrefillCard asset={mockAsset} />);

    expect(screen.getByTestId("asset-prefill-card")).toBeInTheDocument();
    expect(screen.getByTestId("asset-field-name")).toHaveValue("Servidor Principal");
    expect(screen.getByTestId("asset-field-code")).toHaveValue("AST-001");
    expect(screen.getByTestId("asset-field-serial")).toHaveValue("SN-12345");
    expect(screen.getByTestId("asset-field-status")).toHaveValue("ACTIVE");

    expect(screen.getByTestId("asset-field-name")).toHaveAttribute(
      "aria-readonly",
      "true"
    );
    expect(screen.getByTestId("asset-field-code")).toHaveAttribute("readonly");
  });
});
