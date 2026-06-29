import { apiClient } from "@shared/lib/http/client";
import type {
  Asset,
  AssetQrResponse,
  CreateAssetRequest
} from "@features/assets/types/assets.types";

export const adminAssetsService = {
  list(params?: { page?: number; size?: number; query?: string }) {
    return apiClient<{ content: Asset[]; totalElements: number }>("/assets", {
      method: "GET",
      query: params
    });
  },
  create(payload: CreateAssetRequest) {
    return apiClient<Asset>("/assets", { method: "POST", body: payload });
  },
  remove(id: string) {
    return apiClient<void>(`/assets/${id}`, { method: "DELETE" });
  },
  getQr(id: string) {
    return apiClient<AssetQrResponse>(`/assets/${id}/qr`);
  }
};
