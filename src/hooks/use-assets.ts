"use client";

import { useQuery } from "@tanstack/react-query";
import { adminAssetsService } from "@features/assets/services/adminAssetsService";

export function useAssets(params?: { page?: number; size?: number; query?: string }) {
  return useQuery({
    queryKey: ["assets", params],
    queryFn: () => adminAssetsService.list(params)
  });
}
