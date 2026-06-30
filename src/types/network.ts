/**
 * Network discovery domain types — mirrors the backend's
 * `com.jaxon.backend.domain.network.model.DiscoveredDevice` for the
 * /network endpoints introduced by ISSUE-BE-032.
 *
 * Kept minimal here (only fields the DeviceTable component reads); expand
 * as the UI grows.
 */

export type DeviceStatus = "ONLINE" | "OFFLINE" | "UNKNOWN";

export interface DiscoveredDevice {
  id: string;
  scanId: string;
  ipAddress: string;
  macAddress: string | null;
  hostname: string | null;
  osType: string | null;
  sshPort: number;
  sshBanner: string | null;
  deviceStatus: DeviceStatus;
  agentDeployed: boolean;
  agentId: string | null;
  openPorts: number[];
  firstDiscoveredAt: string;
  lastSeenAt: string;
}