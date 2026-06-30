export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  tickets: "/tickets",
  ticketsScan: "/tickets/scan",
  ticketsNew: "/tickets/new",
  myTickets: "/my-tickets",
  assets: "/assets",
  technicianTickets: "/technician/tickets",
  adminAssets: "/admin/assets",
  adminAssetsNew: "/admin/assets/new",
  adminAssetsOrphans: "/admin/assets/orphans",
  admin: "/admin",
  reports: "/reports",
  auditor: {
    root: "/auditor",
    auditLogs: "/auditor/audit-logs",
    reports: "/auditor/reports",
  }
} as const;
