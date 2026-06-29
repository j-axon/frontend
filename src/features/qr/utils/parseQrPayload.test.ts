import { describe, it, expect } from "vitest";
import { parseQrPayload, extractUuid } from "@features/qr/utils/parseQrPayload";

describe("parseQrPayload", () => {
  it("acepta UUID plano", () => {
    const r = parseQrPayload("aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee");
    expect(r?.uuid).toBe("aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee");
  });
  it("extrae UUID de una URL /scan/{uuid}", () => {
    expect(extractUuid("/scan/aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee")).toBe(
      "aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee"
    );
  });
  it("extrae UUID de una URL con ?uuid=", () => {
    expect(
      extractUuid("https://jaxon.local/scan?uuid=aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee")
    ).toBe("aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee");
  });
  it("rechaza texto inválido", () => {
    expect(parseQrPayload("hola mundo")).toBeNull();
  });
});
