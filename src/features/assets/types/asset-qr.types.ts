export interface AssetQrResponse {
  id: string;
  name: string;
  code: string;
  status: string;
  serialNumber?: string;
  location?: string;
}

export interface QrScanResult {
  assetId: string;
  isValid: boolean;
  error?: string;
}
