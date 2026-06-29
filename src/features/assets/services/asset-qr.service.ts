import { httpClient } from "@/lib/api/http-client";
import { AssetQrResponse } from "@/features/assets/types/asset-qr.types";

export async function getAssetByUuid(uuid: string): Promise<AssetQrResponse> {
  return httpClient<AssetQrResponse>(`/v1/assets/qr/${uuid}`);
}
