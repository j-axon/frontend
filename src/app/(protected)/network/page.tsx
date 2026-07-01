"use client";

import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@shared/lib/http/client";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import type { DiscoveredDevice } from "@/types/network";

interface NetworkScan {
  id: string;
  subnet: string;
  startedAt: string;
  finishedAt: string | null;
  status: "RUNNING" | "COMPLETED" | "FAILED";
  devices?: DiscoveredDevice[];
}

export default function NetworkPage() {
  const qc = useQueryClient();
  const [subnet, setSubnet] = React.useState("192.168.1.0/24");
  const [activeScanId, setActiveScanId] = React.useState<string | null>(null);
  const [localScan, setLocalScan] = React.useState<NetworkScan | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["network-scans", activeScanId],
    queryFn: () =>
      apiClient<{ items: NetworkScan[] }>(
        activeScanId ? `/network/scans/${activeScanId}` : "/network/scans",
        { skipAuth: false }
      ),
    staleTime: 10_000
  });

  const allDevices: DiscoveredDevice[] = React.useMemo(() => {
    // Primero los del scan local (si existe), después los del backend.
    const localD = localScan?.devices ?? [];
    const remoteItems = Array.isArray(data?.items) ? data!.items : [];
    const remoteD = remoteItems[0]?.devices ?? [];
    return [...localD, ...remoteD];
  }, [data, localScan]);

  const onStart = React.useCallback(() => {
    const id = `local-${Date.now()}`;
    const scan: NetworkScan = {
      id,
      subnet,
      startedAt: new Date().toISOString(),
      finishedAt: null,
      status: "RUNNING",
      devices: []
    };
    setLocalScan(scan);
    setActiveScanId(null);
    void refetch();

    // Simula que después de 2s el escaneo "termina" con dispositivos fake.
    // El backend stub no implementa scan real todavía.
    setTimeout(() => {
      const fakeDevices = generateFakeDevices(subnet);
      setLocalScan((prev) => (prev && prev.id === id
        ? {
            ...prev,
            finishedAt: new Date().toISOString(),
            status: "COMPLETED",
            devices: fakeDevices
          }
        : prev));
    }, 2000);
  }, [subnet, refetch]);

  // Genera 3-6 dispositivos fake a partir de la subred.
  // Reemplaza el último octeto por números aleatorios 1..254 y rellena metadata.
  function generateFakeDevices(inputSubnet: string): DiscoveredDevice[] {
    const base = inputSubnet.replace(/\/\d+$/, "").split(".").slice(0, 3).join(".");
    const scanId = `scan-${Date.now()}`;
    const count = 3 + Math.floor(Math.random() * 4);
    const hostnames = ["gateway", "nas01", "switch-core", "ap-oficina", "srv-db", "ws-01", "laptop-jp"];
    const oses = ["Debian 12", "Ubuntu 22.04", "FreeBSD 14", "pfSense 2.7", "OpenWrt 23"];
    return Array.from({ length: count }, (_, i) => {
      const ip = `${base}.${10 + Math.floor(Math.random() * 200)}`;
      const id = `dev-${Math.random().toString(36).slice(2, 10)}`;
      const isOnline = Math.random() > 0.3;
      return {
        id,
        scanId,
        ipAddress: ip,
        macAddress: Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
        ).join(":"),
        hostname: hostnames[i % hostnames.length] + `-${i + 1}`,
        osType: oses[i % oses.length],
        sshPort: 22,
        sshBanner: "OpenSSH_9.6",
        deviceStatus: isOnline ? "ONLINE" : "OFFLINE",
        agentDeployed: Math.random() > 0.6,
        agentId: null,
        openPorts: [22, 80].slice(0, 1 + Math.floor(Math.random() * 2)),
        firstDiscoveredAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString()
      };
    });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart();
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-fg">Escanear red</h1>
        <p className="text-sm text-fg-soft">
          Descubre dispositivos activos en una subred y despliega el agente J-AXON.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-bg-soft p-4"
      >
        <Input
          label="Subred (CIDR)"
          value={subnet}
          onChange={(e) => setSubnet(e.target.value)}
          placeholder="192.168.1.0/24"
          className="font-mono"
        />
        <Button type="submit" loading={isLoading && !localScan}>
          {localScan?.status === "RUNNING" ? "Escaneando…" : "Iniciar escaneo"}
        </Button>
        <p className="text-xs text-fg-soft">
          Subred actual: <span className="font-mono">{subnet}</span>
        </p>
      </form>

      {localScan && (
        <section className="rounded-lg border border-border bg-bg-soft p-4">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-medium text-fg">
              Escaneo actual: <span className="font-mono text-sm">{localScan.subnet}</span>
            </h2>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                localScan.status === "RUNNING"
                  ? "bg-amber-500/15 text-amber-300"
                  : localScan.status === "COMPLETED"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-red-500/15 text-red-300"
              }`}
            >
              {localScan.status}
            </span>
          </header>
          <dl className="grid grid-cols-1 gap-1 text-xs text-fg-soft sm:grid-cols-3">
            <div>
              <dt className="inline font-medium">Inicio:</dt>{" "}
              <dd className="inline">{new Date(localScan.startedAt).toLocaleTimeString()}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Fin:</dt>{" "}
              <dd className="inline">
                {localScan.finishedAt ? new Date(localScan.finishedAt).toLocaleTimeString() : "—"}
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">ID:</dt>{" "}
              <dd className="inline font-mono">{localScan.id}</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="rounded-lg border border-border bg-bg-soft p-4">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium text-fg">Dispositivos descubiertos</h2>
          <span className="text-xs text-fg-soft">
            {allDevices.length} dispositivo{allDevices.length === 1 ? "" : "s"}
          </span>
        </header>

        {isLoading && !localScan ? (
          <LoadingState label="Cargando dispositivos…" rows={3} />
        ) : isError && allDevices.length === 0 ? (
          <div className="grid gap-2 rounded-md border border-danger/40 bg-red-950/20 p-4 text-sm text-red-200">
            <p>
              No fue posible cargar el escaneo. El backend podría no exponer
              <code className="mx-1 rounded bg-red-950/60 px-1 py-0.5 font-mono">GET /v1/network/scans</code>
              todavía.
            </p>
            <Button type="button" variant="outline" onClick={() => void refetch()}>
              Reintentar
            </Button>
          </div>
        ) : allDevices.length === 0 ? (
          <p className="text-sm text-fg-soft">
            No hay dispositivos descubiertos. Iniciá un escaneo con una subred válida.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-wider text-fg-soft">
                <tr>
                  <th className="p-2">IP</th>
                  <th className="p-2">Hostname</th>
                  <th className="p-2">MAC</th>
                  <th className="p-2">Estado</th>
                  <th className="p-2">SSH</th>
                  <th className="p-2">SO</th>
                  <th className="p-2">Agente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allDevices.map((d) => (
                  <tr key={d.id} className="hover:bg-muted/40">
                    <td className="p-2 font-mono text-blue-300">{d.ipAddress}</td>
                    <td className="p-2">{d.hostname ?? "—"}</td>
                    <td className="p-2 font-mono text-xs">{d.macAddress ?? "—"}</td>
                    <td className="p-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          d.deviceStatus === "ONLINE"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-muted text-fg-soft"
                        }`}
                      >
                        {d.deviceStatus}
                      </span>
                    </td>
                    <td className="p-2 font-mono text-xs">{d.sshPort ?? "—"}</td>
                    <td className="p-2 text-xs">{d.osType ?? "—"}</td>
                    <td className="p-2">
                      {d.agentDeployed ? (
                        <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-xs text-purple-300">
                          Instalado
                        </span>
                      ) : (
                        <span className="text-xs text-fg-soft">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
