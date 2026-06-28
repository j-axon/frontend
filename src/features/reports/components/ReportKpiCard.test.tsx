import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReportKpiCard } from "./ReportKpiCard";
import type { ReportKPI } from "@/types/reports";

const mockKPI: ReportKPI = {
  id: "total-tickets",
  label: "Total Tickets",
  value: 150,
  previousValue: 120,
  trend: "up",
  unit: "tickets",
};

describe("ReportKpiCard", () => {
  it("renders KPI label and value", () => {
    render(<ReportKpiCard kpi={mockKPI} />);
    expect(screen.getByText("Total Tickets")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("tickets")).toBeInTheDocument();
  });

  it("renders trend arrow for up trend", () => {
    render(<ReportKpiCard kpi={mockKPI} />);
    expect(screen.getByText("↑")).toBeInTheDocument();
  });

  it("renders trend arrow for down trend", () => {
    const downTrendKPI: ReportKPI = { ...mockKPI, trend: "down" };
    render(<ReportKpiCard kpi={downTrendKPI} />);
    expect(screen.getByText("↓")).toBeInTheDocument();
  });

  it("renders trend arrow for neutral trend", () => {
    const neutralTrendKPI: ReportKPI = { ...mockKPI, trend: "neutral" };
    render(<ReportKpiCard kpi={neutralTrendKPI} />);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("does not render trend when not provided", () => {
    const noTrendKPI: ReportKPI = { id: "test", label: "Test", value: 100 };
    render(<ReportKpiCard kpi={noTrendKPI} />);
    expect(screen.queryByText("↑")).not.toBeInTheDocument();
    expect(screen.queryByText("↓")).not.toBeInTheDocument();
  });
});