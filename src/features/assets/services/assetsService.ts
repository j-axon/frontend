import { apiClient } from "@shared/lib/http/client";
import type {
  Asset,
  AssetQrResponse,
  CreateAssetRequest
} from "@features/assets/types/assets.types";

export const assetsService = {
  /** Usuario: obtiene el activo escaneado por QR. */
  async getByQrUuid(qrUuid: string): Promise<AssetQrResponse> {
    return apiClient<AssetQrResponse>(`/assets/qr/${qrUuid}`);
  },

  /** Admin: listado paginado */
  async list(params?: {
    page?: number;
    size?: number;
    query?: string;
  }): Promise<{ content: Asset[]; totalElements: number }> {
    return apiClient("/assets", {
      method: "GET",
      query: {
        page: params?.page,
        size: params?.size,
        query: params?.query
      }
    });
  },

  /** Admin: crea un activo */
  async create(payload: CreateAssetRequest): Promise<Asset> {
    return apiClient<Asset>("/assets", {
      method: "POST",
      body: payload
    });
  }
};
