/**
 * Variables de entorno validadas.
 * Solo expone NEXT_PUBLIC_* al cliente. El refresh token NUNCA viaja aquí.
 */
const requireEnv = (value: string | undefined, fallback?: string): string => {
  if (value && value.length > 0) return value;
  if (fallback !== undefined) return fallback;
  throw new Error("Variable de entorno requerida faltante");
};

export const env = {
  apiBaseUrl: requireEnv(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "http://localhost:8080/api/v1"
  ),
  wsUrl: requireEnv(
    process.env.NEXT_PUBLIC_WS_URL,
    "ws://localhost:8080/ws"
  ),
  appName: requireEnv(process.env.NEXT_PUBLIC_APP_NAME, "J-AXON"),
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  qrScanRoute: process.env.NEXT_PUBLIC_QR_SCAN_ROUTE ?? "/qr/scan"
} as const;

export type AppEnv = typeof env;
