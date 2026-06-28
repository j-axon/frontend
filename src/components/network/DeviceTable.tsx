import type { DiscoveredDevice } from "@/types/network";

export type DeviceTableProps = {
  devices: DiscoveredDevice[];
  onDeploy: (d: DiscoveredDevice) => void;
  onAdopt: (d: DiscoveredDevice) => void;
  deployingId: string | null;
};

export function DeviceTable({ devices, onDeploy, onAdopt, deployingId }: DeviceTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 font-medium">IP</th>
            <th className="p-3 font-medium">Hostname</th>
            <th className="p-3 font-medium">MAC</th>
            <th className="p-3 font-medium">Estado</th>
            <th className="p-3 font-medium">SSH</th>
            <th className="p-3 font-medium">OS</th>
            <th className="p-3 font-medium">Agente</th>
            <th className="p-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {devices.map((device) => (
            <tr key={device.id} className={`hover:bg-muted/50 ${device.sshPort != null ? "bg-green-50/30" : ""}`}>
              <td className="p-3 font-mono text-blue-600">{device.ipAddress}</td>
              <td className="p-3">{device.hostname ?? "—"}</td>
              <td className="p-3 font-mono text-xs">{device.macAddress ?? "—"}</td>
              <td className="p-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${device.deviceStatus === "ONLINE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${device.deviceStatus === "ONLINE" ? "bg-green-500" : "bg-gray-400"}`} />
                  {device.deviceStatus}
                </span>
              </td>
              <td className="p-3">
                {device.sshPort ? (
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">{device.sshPort}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
              <td className="p-3 text-xs">{device.osType ?? "—"}</td>
              <td className="p-3">
                {device.agentDeployed ? (
                  <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">Instalado</span>
                ) : (
                  <span className="text-xs text-muted-foreground">No</span>
                )}
              </td>
              <td className="p-3">
                <div className="flex gap-1">
                  {!device.agentDeployed && device.deviceStatus === "ONLINE" && (
                    <button onClick={() => onDeploy(device)} disabled={deployingId === device.id}
                      className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                      {deployingId === device.id ? "..." : "Deploy"}
                    </button>
                  )}
                  {device.agentDeployed && (
                    <button onClick={() => onAdopt(device)}
                      className="rounded bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-700">
                      Inventario
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}