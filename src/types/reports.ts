export type ReportKPI = {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  trend?: "up" | "down" | "neutral";
  unit?: string;
};

export type TicketsByCategory = {
  category: string;
  count: number;
};

export type TicketsByTechnician = {
  technicianId: string;
  technicianName: string;
  resolvedCount: number;
  avgResolutionTime?: number;
};

export type AssetsByStatus = {
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "ORPHAN";
  count: number;
};

export type TopAssetsWithIncidents = {
  assetId: string;
  assetName: string;
  incidentCount: number;
};

export type ReportsSummary = {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  totalAssets: number;
  assetsByStatus: AssetsByStatus[];
  ticketsByCategory: TicketsByCategory[];
  ticketsByTechnician: TicketsByTechnician[];
  topAssetsWithIncidents: TopAssetsWithIncidents[];
};

export type ReportsFilters = {
  startDate?: string;
  endDate?: string;
  category?: string;
  technicianId?: string;
};