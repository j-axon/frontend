import { httpClient } from "@/lib/api/http-client";

export type AdminAsset = {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  assignedTo?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OrphanAsset = {
  id: string;
  code: string;
  name: string;
  description?: string;
  discoveredAt: string;
};

type AdminAssetsApiResponse = {
  items: AdminAsset[];
};

type OrphanAssetsApiResponse = {
  items: OrphanAsset[];
};

async function fetchAdminAssets(): Promise<AdminAsset[]> {
  // Backend has no GET /v1/assets (list) endpoint yet. /v1/orphans
  // returns the only asset list the backend exposes today. Until a
  // dedicated /v1/assets list is added, the panel shows what is in
  // /v1/orphans (which is every asset the backend can list).
  const response = await httpClient<OrphanAssetsApiResponse>("/v1/orphans");
  return response.items.map((o) => ({
    id: o.id,
    code: o.code,
    name: o.name,
    description: o.description,
    status: "INACTIVE" as const,
    createdAt: o.discoveredAt,
    updatedAt: o.discoveredAt,
  }));
}

async function createAsset(data: {
  code: string;
  name: string;
  description?: string;
  assignedToUserId?: string;
}): Promise<AdminAsset> {
  return httpClient("/v1/assets", {
    method: "POST",
    body: data
  });
}

async function fetchOrphanAssets(): Promise<OrphanAsset[]> {
  const response = await httpClient<OrphanAssetsApiResponse>("/v1/assets/orphans");
  return response.items;
}

async function adoptAsset(assetId: string): Promise<void> {
  await httpClient(`/v1/assets/${assetId}/adopt`, {
    method: "POST"
  });
}

async function rejectAsset(assetId: string): Promise<void> {
  await httpClient(`/v1/assets/${assetId}/reject`, {
    method: "POST"
  });
}

async function generateQrCode(assetId: string): Promise<{ qrCode: string }> {
  return httpClient(`/v1/assets/${assetId}/qr`);
}

export const adminAssetsService = {
  fetchAdminAssets,
  createAsset,
  fetchOrphanAssets,
  adoptAsset,
  rejectAsset,
  generateQrCode
};
