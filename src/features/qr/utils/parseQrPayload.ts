import type { QrScanResult } from "../types/qr.types";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function extractUuid(text: string): string | null {
  const cleaned = text.trim();
  // Caso 1: la cadena completa es un UUID
  if (UUID_REGEX.test(cleaned)) return cleaned.toLowerCase();

  // Caso 2: url relativa tipo /scan/{uuid} o /tickets/new/{uuid}
  const pathMatch = cleaned.match(/\/([0-9a-f-]{36})\/?$/i);
  if (pathMatch && UUID_REGEX.test(pathMatch[1])) {
    return pathMatch[1].toLowerCase();
  }

  // Caso 3: query param uuid=...
  try {
    const url = new URL(cleaned, "http://localhost");
    const id = url.searchParams.get("uuid");
    if (id && UUID_REGEX.test(id)) return id.toLowerCase();
  } catch {
    // no es URL
  }

  return null;
}

export function parseQrPayload(text: string): QrScanResult | null {
  const uuid = extractUuid(text);
  if (!uuid) return null;
  return {
    raw: text,
    uuid,
    scannedAt: new Date().toISOString()
  };
}
