import { env } from "@shared/lib/env";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";
import { normalizeApiError, ApiRequestError } from "./errors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  withCredentials?: boolean;
  skipAuth?: boolean;
  signal?: AbortSignal;
  query?: Record<string, string | number | boolean | undefined | null>;
};

const REFRESH_PATH = "/auth/refresh";

let refreshInFlight: Promise<string | null> | null = null;

async function tryRefresh(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${env.apiBaseUrl}${REFRESH_PATH}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { accessToken: string };
      tokenMemoryStore.set(data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      // pequeña espera para no disparar múltiples refrescos en paralelo
      setTimeout(() => {
        refreshInFlight = null;
      }, 50);
    }
  })();
  return refreshInFlight;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  if (path.startsWith("http")) return path;
  const base = env.apiBaseUrl.replace(/\/$/, "");
  const tail = path.startsWith("/") ? path : `/${path}`;
  if (!query) return `${base}${tail}`;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    params.append(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${base}${tail}?${qs}` : `${base}${tail}`;
}

export async function apiClient<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers,
    withCredentials = false,
    skipAuth = false,
    signal,
    query
  } = options;

  const send = async (retried: boolean): Promise<Response> => {
    const reqHeaders: Record<string, string> = {
      Accept: "application/json",
      ...(headers as Record<string, string> | undefined)
    };
    if (body && !reqHeaders["Content-Type"] && !(body instanceof FormData)) {
      reqHeaders["Content-Type"] = "application/json";
    }
    if (!skipAuth) {
      const token = tokenMemoryStore.get();
      if (token) reqHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(path, query), {
      method,
      headers: reqHeaders,
      credentials: withCredentials ? "include" : "same-origin",
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
          ? body
          : JSON.stringify(body),
      signal
    });

    if (response.status === 401 && !skipAuth && !retried && !path.startsWith(REFRESH_PATH)) {
      const newToken = await tryRefresh();
      if (newToken) {
        tokenMemoryStore.set(newToken);
        return send(true);
      }
    }

    return response;
  };

  const response = await send(false);

  if (response.status === 204) {
    return undefined as unknown as TResponse;
  }

  if (!response.ok) {
    throw await normalizeApiError(response);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }
  return (await response.text()) as unknown as TResponse;
}

export async function apiClientSafe<TResponse>(
  path: string,
  options?: RequestOptions
): Promise<{ ok: true; data: TResponse } | { ok: false; error: ApiRequestError }> {
  try {
    const data = await apiClient<TResponse>(path, options);
    return { ok: true, data };
  } catch (err) {
    if (err instanceof ApiRequestError) return { ok: false, error: err };
    return {
      ok: false,
      error: new ApiRequestError("UNKNOWN", 0, (err as Error)?.message ?? "Error desconocido")
    };
  }
}
