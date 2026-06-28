import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeviceTable } from "@/components/network/DeviceTable";
import type { DiscoveredDevice } from "@/types/network";

const baseDevice: DiscoveredDevice = {
  id: "d1",
  scanId: "s1",
  ipAddress: "10.0.0.1",
  macAddress: null,
  hostname: "server-01",
  osType: "Linux",
  sshPort: 22,
  sshBanner: null,
  deviceStatus: "ONLINE",
  agentDeployed: false,
  agentId: null,
  openPorts: [22],
  firstDiscoveredAt: "",
  lastSeenAt: "",
};

describe("DeviceTable", () => {
  it("renderiza encabezados y filas con devices", () => {
    render(
      <DeviceTable
        devices={[baseDevice]}
        onDeploy={vi.fn()}
        onAdopt={vi.fn()}
        deployingId={null}
      />,
    );

    expect(screen.getByText("IP")).toBeInTheDocument();
    expect(screen.getByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("MAC")).toBeInTheDocument();
    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("SSH")).toBeInTheDocument();
    expect(screen.getByText("OS")).toBeInTheDocument();
    expect(screen.getByText("Agente")).toBeInTheDocument();
    expect(screen.getByText("Acciones")).toBeInTheDocument();

    expect(screen.getByText("10.0.0.1")).toBeInTheDocument();
    expect(screen.getByText("server-01")).toBeInTheDocument();
    expect(screen.getByText("Linux")).toBeInTheDocument();
  });

  it("renderiza sin filas cuando devices está vacío", () => {
    render(
      <DeviceTable
        devices={[]}
        onDeploy={vi.fn()}
        onAdopt={vi.fn()}
        deployingId={null}
      />,
    );

    expect(screen.getByText("IP")).toBeInTheDocument();
    expect(screen.queryByText("10.0.0.1")).not.toBeInTheDocument();
    expect(screen.queryByText("Deploy")).not.toBeInTheDocument();
    expect(screen.queryByText("Inventario")).not.toBeInTheDocument();
  });

  it("muestra botón Deploy para device online sin agente", async () => {
    const onDeploy = vi.fn();
    render(
      <DeviceTable
        devices={[baseDevice]}
        onDeploy={onDeploy}
        onAdopt={vi.fn()}
        deployingId={null}
      />,
    );

    const deployBtn = screen.getByText("Deploy");
    expect(deployBtn).toBeInTheDocument();

    await userEvent.click(deployBtn);
    expect(onDeploy).toHaveBeenCalledWith(baseDevice);
  });

  it("muestra botón Inventario cuando agentDeployed es true", async () => {
    const onAdopt = vi.fn();
    const deviceWithAgent: DiscoveredDevice = {
      ...baseDevice,
      agentDeployed: true,
      agentId: "agent-1",
    };

    render(
      <DeviceTable
        devices={[deviceWithAgent]}
        onDeploy={vi.fn()}
        onAdopt={onAdopt}
        deployingId={null}
      />,
    );

    const adoptBtn = screen.getByText("Inventario");
    expect(adoptBtn).toBeInTheDocument();
    expect(screen.queryByText("Deploy")).not.toBeInTheDocument();
    expect(screen.getByText("Instalado")).toBeInTheDocument();

    await userEvent.click(adoptBtn);
    expect(onAdopt).toHaveBeenCalledWith(deviceWithAgent);
  });

  it("muestra estado de deploying cuando deployingId coincide con el device", () => {
    render(
      <DeviceTable
        devices={[baseDevice]}
        onDeploy={vi.fn()}
        onAdopt={vi.fn()}
        deployingId={baseDevice.id}
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
  });
});