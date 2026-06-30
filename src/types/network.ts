export interface DiscoveredDevice {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: "ONLINE" | "OFFLINE" | "UNREACHABLE";
  deviceStatus: "ONLINE" | "OFFLINE" | "UNREACHABLE";
  agentDeployed: boolean;
  agentId?: string;
  macAddress?: string;
  hostname?: string;
  osType?: string;
  ipAddress: string;
  openPorts?: number[];
  sshPort?: number;
  firstDiscoveredAt: string;
  lastSeenAt: string;
  [key: string]: unknown;
}
