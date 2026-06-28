import { env } from "@/lib/env";
import { HttpError } from "@/lib/api/http-error";
import { getAccessToken } from "@/lib/auth/token-storage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  authenticated?: boolean;
};

export async function httpClient<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Attach JWT for all requests by default. Set authenticated:false for
  // unauthenticated endpoints like /v1/auth/login.
  if (options.authenticated !== false) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${env.apiUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include"
  });

  if (!response.ok) {
    throw new HttpError(response.status, `HTTP error ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}