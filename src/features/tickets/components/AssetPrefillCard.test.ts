import React from "react";
import { render, screen } from "@testing-library/react";
import { AssetPrefillCard } from "@/features/tickets/components/AssetPrefillCard";

describe("AssetPrefillCard", () => {
  it("muestra datos tecnicos precargados en modo no editable", () => {
    render(
      React.createElement(AssetPrefillCard, {
        asset: {
          assetUuid: "asset-001",
          assetCode: "PC-01",
          assetName: "Laptop Recepcion",
          technicalType: "Laptop",
          model: "ThinkPad",
          serialNumber: "SN-123",
          location: "Piso 2"
        }
      })
    );

    const uuidInput = screen.getByDisplayValue("asset-001");
    const codeInput = screen.getByDisplayValue("PC-01");
    const nameInput = screen.getByDisplayValue("Laptop Recepcion");

    expect(uuidInput).toHaveAttribute("readonly");
    expect(codeInput).toHaveAttribute("readonly");
    expect(nameInput).toHaveAttribute("readonly");
  });
});
