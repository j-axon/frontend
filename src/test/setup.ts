import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Polyfill TextEncoder/TextDecoder por jsdom
import { TextEncoder, TextDecoder } from "node:util";
if (typeof globalThis.TextEncoder === "undefined") {
  // @ts-expect-error asignar global
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === "undefined") {
  // @ts-expect-error asignar global
  globalThis.TextDecoder = TextDecoder;
}

// matchMedia no existe en jsdom
if (typeof window !== "undefined" && !window.matchMedia) {
  // @ts-expect-error stub
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false
  });
}
