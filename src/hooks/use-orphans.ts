"use client";

import { useQuery } from "@tanstack/react-query";
import { orphansService } from "@features/orphans/services/orphansService";

export function useOrphans() {
  return useQuery({
    queryKey: ["orphans"],
    queryFn: () => orphansService.list()
  });
}
