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
