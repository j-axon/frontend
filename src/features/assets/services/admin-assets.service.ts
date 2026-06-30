import { apiClient } from "@shared/lib/http/client";

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

async function fetchAdminAssets(): Promise<AdminAsset[]> {
  // En backend v1, GET /orphans devuelve el listado.
  // Intentamos obtenerlo de /orphans
  try {
    const response = await apiClient<OrphanAsset[] | { items: OrphanAsset[] }>("/orphans");
    const items = Array.isArray(response) ? response : response.items || [];
    return items.map((o) => ({
      id: o.id,
      code: o.code,
      name: o.name,
      description: o.description,
      status: "INACTIVE" as const,
      createdAt: o.discoveredAt || new Date().toISOString(),
      updatedAt: o.discoveredAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

async function createAsset(data: {
  code: string;
  name: string;
  description?: string;
  assignedToUserId?: string;
}): Promise<AdminAsset> {
  return apiClient<AdminAsset>("/assets", {
    method: "POST",
    body: data
  });
}

async function fetchOrphanAssets(): Promise<OrphanAsset[]> {
  const response = await apiClient<OrphanAsset[] | { items: OrphanAsset[] }>("/orphans");
  return Array.isArray(response) ? response : response.items || [];
}

async function adoptAsset(assetId: string): Promise<void> {
  await apiClient<void>(`/orphans/${assetId}/adopt`, {
    method: "POST"
  });
}

async function rejectAsset(assetId: string): Promise<void> {
  await apiClient<void>(`/orphans/${assetId}/reject`, {
    method: "POST"
  });
}

async function generateQrCode(assetId: string): Promise<{ qrCode: string }> {
  return apiClient<{ qrCode: string }>(`/assets/${assetId}/qr`);
}

export const adminAssetsService = {
  fetchAdminAssets,
  createAsset,
  fetchOrphanAssets,
  adoptAsset,
  rejectAsset,
  generateQrCode
};
