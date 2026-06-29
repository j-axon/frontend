export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNKNOWN";

export type ApiError = {
  code: ApiErrorCode;
  message: string;
  status: number;
  details?: unknown;
};

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export type PageRequest = {
  page?: number;
  size?: number;
  sort?: string;
};
