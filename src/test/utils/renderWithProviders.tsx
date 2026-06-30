import * as React from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false }
    }
  });
}

// Mock de next/navigation para tests jsdom (Next 15 requiere App Router montado).
// Permite usar useRouter(), usePathname() y useSearchParams() sin envolver en <Router>.
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams()
}));

import { vi } from "vitest";

export function renderWithProviders(
  ui: React.ReactNode,
  options: Omit<RenderOptions, "queries"> & { client?: QueryClient } = {}
): RenderResult {
  const { client = createTestQueryClient(), ...rest } = options;
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  }
  return render(ui, { wrapper: Wrapper, ...rest });
}