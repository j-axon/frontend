import { QrScanResult } from "@/features/assets/types/asset-qr.types";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const validateQrPayload = (payload: string): QrScanResult => {
  if (!payload || payload.trim() === "") {
    return { assetId: "", isValid: false, error: "El código QR está vacío." };
  }

  const potentialUuid = payload.includes("/") 
    ? payload.split("/").pop() || "" 
    : payload;

  if (!UUID_REGEX.test(potentialUuid)) {
    return { assetId: "", isValid: false, error: "El formato del código QR no es válido para J-AXON." };
  }

  return { assetId: potentialUuid, isValid: true };
};