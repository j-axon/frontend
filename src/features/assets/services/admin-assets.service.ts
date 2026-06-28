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

// Backend returns a bare array (not a paginated envelope).

// NOTE: Backend does NOT expose a general /v1/assets list endpoint
// (only POST /v1/assets, GET /v1/assets/{id}, GET /v1/assets/{id}/qr,
// GET /v1/assets/{id}/history, GET /v1/assets/qr/{uuid}). The admin
// panel list view will show an empty state until that endpoint is added.

async function fetchAdminAssets(): Promise<AdminAsset[]> {
  // Backend currently returns 500 here. Until /v1/assets list is exposed,
  // return empty so the UI renders the empty state instead of an error.
  return [];
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
  return httpClient<OrphanAsset[]>("/v1/orphans");
}

async function adoptAsset(assetId: string): Promise<void> {
  // Backend exposes /v1/orphans/{id}/adopt (NOT /v1/assets/{id}/adopt).
  await httpClient(`/v1/orphans/${assetId}/adopt`, {
    method: "POST"
  });
}

async function rejectAsset(assetId: string): Promise<void> {
  // Backend exposes /v1/orphans/{id}/reject (NOT /v1/assets/{id}/reject).
  await httpClient(`/v1/orphans/${assetId}/reject`, {
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