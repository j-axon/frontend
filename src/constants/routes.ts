export const ROUTES = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  tickets: "/tickets",
  myTickets: "/my-tickets",
  technicianTickets: "/technician/tickets",
  technicianTicketDetail: (id: string) => `/technician/tickets/${id}`,
  assets: "/assets",
  adminAssets: "/admin/assets",
  adminAssetsNew: "/admin/assets/new",
  adminAssetsOrphans: "/admin/assets/orphans",
  admin: "/admin",
  reports: "/reports"
} as const;
