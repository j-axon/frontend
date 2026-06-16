export type AssetStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "ORPHAN";

export type Asset = {
  id: string;
  code: string;
  name: string;
  status: AssetStatus;
  serialNumber?: string;
  assignedUserId?: string;
};
