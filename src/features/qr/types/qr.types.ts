export type QrScanResult = {
  raw: string;
  uuid: string;
  scannedAt: string; // ISO
};

export type CameraPermissionState =
  | "IDLE"
  | "PROMPT"
  | "GRANTED"
  | "DENIED"
  | "UNSUPPORTED"
  | "ERROR";
