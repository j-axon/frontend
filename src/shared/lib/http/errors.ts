import type { ApiError, ApiErrorCode } from "@shared/types/api";

function codeFromStatus(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 422 || status === 400) return "VALIDATION_ERROR";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN";
}

export class ApiRequestError extends Error implements ApiError {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: ApiErrorCode, status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export async function normalizeApiError(response: Response): Promise<ApiRequestError> {
  let payload: unknown = null;
  try {
    payload = await response.clone().json();
  } catch {
    try {
      payload = { message: await response.text() };
    } catch {
      payload = null;
    }
  }
  const p = (payload ?? {}) as { message?: string; error?: string; detail?: string; code?: ApiErrorCode };
  const message =
    p.message ||
    p.error ||
    p.detail ||
    response.statusText ||
    `Error HTTP ${response.status}`;
  const code = p.code ?? codeFromStatus(response.status);
  return new ApiRequestError(code, response.status, message, payload);
}

export function isUnauthorized(err: unknown): boolean {
  return err instanceof ApiRequestError && err.status === 401;
}
