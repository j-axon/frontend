import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/test/mocks/server";
import { useAuthStore } from "@features/auth/store/authStore";
import { useLatestDiagnosis } from "@features/ai/hooks/useLatestDiagnosis";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";
import { ROLES } from "@/constants/roles";
import * as React from "react";

const TICKET_ID = "tc-demo-id";

const cachedDiagnostic: AiDiagnosticResponse = {
  summary: "Caché previo: revisar cable HDMI",
  confidence: 0.82,
  confidenceLevel: "HIGH",
  recommendation: {
    title: "Verificar cable",
    rationale: "Cache hit",
    steps: ["Paso A", "Paso B"],
    relatedKbUrl: "https://kb.example.com/x"
  },
  generatedAt: "2026-06-29T12:00:00Z"
};

function makeWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false }
    }
  });
  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client }, children);
  }
  Wrapper.displayName = "QueryWrapper";
  return Wrapper;
}

function setupAuth(roles: ("ADMIN" | "TECNICO" | "USUARIO" | "AUDITOR")[]) {
  useAuthStore.getState().setSession(
    {
      id: "u",
      username: "u",
      email: "u@x.com",
      fullName: "User",
      roles,
      active: true
    },
    "tok-test"
  );
}

describe("useLatestDiagnosis", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession();
    setupAuth([ROLES.TECNICO]);
  });
  afterEach(() => {
    server.resetHandlers();
    useAuthStore.getState().clearSession();
  });

  it("devuelve el diagnóstico cacheado cuando el backend responde 200", async () => {
    server.use(
      http.get(`*/api/v1/ai/tickets/${TICKET_ID}/latest`, () =>
        HttpResponse.json(cachedDiagnostic)
      )
    );

    const { result } = renderHook(() => useLatestDiagnosis(TICKET_ID), {
      wrapper: makeWrapper()
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).not.toBeNull();
    expect(result.current.data?.summary).toBe(cachedDiagnostic.summary);
    expect(result.current.data?.confidence).toBe(0.82);
    expect(result.current.data?.confidenceLevel).toBe("HIGH");
  });

  it("devuelve null (no error) cuando el backend responde 404 — sin caché previa", async () => {
    server.use(
      http.get(`*/api/v1/ai/tickets/${TICKET_ID}/latest`, () =>
        HttpResponse.json({ message: "No diagnostic yet" }, { status: 404 })
      )
    );

    const { result } = renderHook(() => useLatestDiagnosis(TICKET_ID), {
      wrapper: makeWrapper()
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 404 NO debe propagarse como error: ausencia de caché es estado válido.
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it("no se ejecuta si el usuario no es TECNICO ni ADMIN", async () => {
    useAuthStore.getState().clearSession();
    setupAuth([ROLES.USUARIO]);

    let requested = false;
    server.use(
      http.get(`*/api/v1/ai/tickets/${TICKET_ID}/latest`, () => {
        requested = true;
        return HttpResponse.json(cachedDiagnostic);
      })
    );

    const { result } = renderHook(() => useLatestDiagnosis(TICKET_ID), {
      wrapper: makeWrapper()
    });

    // Damos tiempo a ver si se dispara la query.
    await new Promise((r) => setTimeout(r, 50));

    expect(requested).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});