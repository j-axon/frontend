export interface QrScanResult {
  assetId: string;
  isValid: boolean;
  error?: string;
}

export interface AssetQrResponse {
  id: string;
  name: string;
  code: string;
  status: string;
  location: string;
}