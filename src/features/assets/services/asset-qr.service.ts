import { httpClient } from "@/shared/lib/http/client"; 
import { AssetQrResponse } from "../types/asset-qr.types";

export const assetQrService = {
  getAssetByUuid: async (uuid: string): Promise<AssetQrResponse> => {
    const { data } = await httpClient.get<AssetQrResponse>(`/assets/qr/${uuid}`);
    return data;
  }
};