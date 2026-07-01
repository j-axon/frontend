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

/**
 * Alineado con backend `CreateActivoRequest`:
 *  - codigoInventario (required)
 *  - nombre (required)
 *  - tipo, marca, modelo, serial, ubicacion (opcionales)
 *  - status NO se asigna desde la creación: lo decide el backend.
 */
export type CreateAssetRequest = {
  codigoInventario: string;
  nombre: string;
  tipo?: string;
  marca?: string;
  modelo?: string;
  serial?: string;
  ubicacion?: string;
};
