export const ROUTES = {
  home: "/",
  login: "/login",
  logout: "/logout",
  dashboard: "/dashboard",

  // Usuario normal
  myTickets: "/my-tickets",
  scanQr: "/qr/scan",
  newTicketFromQr: (uuid: string) => `/tickets/new/${uuid}`,
  ticketDetail: (id: string) => `/tickets/${id}`,

  // Técnico
  technicianTickets: "/technician/tickets",
  technicianTicket: (id: string) => `/technician/tickets/${id}`,

  // Admin
  adminAssets: "/admin/assets",
  adminAssetNew: "/admin/assets/new",
  adminOrphans: "/admin/orphans",
  adminDashboard: "/admin",

  // Auditor
  auditLogs: "/auditor/audit",
  reports: "/auditor/reports"
} as const;

export const PUBLIC_ROUTES: string[] = ["/", "/login"];
