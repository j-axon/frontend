/**
 * Tipos de dominio para Assets — alineados con el backend v1 y frontend de los compañeros.
 */

export type AssetStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "ORPHAN";

export type Asset = {
  id: string;
  code: string;
  name: string;
  status: AssetStatus;
  serialNumber?: string;
  model?: string;
  brand?: string;
  location?: string;
  assignedUserId?: string;
  assignedUserName?: string;
  assignedUsername?: string;
  qrUuid?: string;
  createdAt: string;
  updatedAt: string;
};

export type AssetQrResponse = {
  id: string;
  name: string;
  code: string;
  serialNumber?: string;
  status: AssetStatus;
  location?: string;
  qrUrl?: string;
  assignedUsername?: string;
};

export type CreateAssetRequest = {
  code: string; // added because CreateAssetForm passes code
  name: string;
  serialNumber?: string;
  model?: string;
  brand?: string;
  location?: string;
  status?: AssetStatus;
  description?: string; // added because CreateAssetForm passes description
  assignedUserId?: string; // added because CreateAssetForm passes assignedUserId
};
