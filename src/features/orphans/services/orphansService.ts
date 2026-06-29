import { apiClient } from "@shared/lib/http/client";
import type { Asset } from "@features/assets/types/assets.types";

export const orphansService = {
  list(): Promise<Asset[]> {
    return apiClient<Asset[]>("/orphans");
  },
  adopt(id: string): Promise<{ mensaje: string }> {
    return apiClient<{ mensaje: string }>(`/orphans/${id}/adopt`, {
      method: "POST"
    });
  }
};
