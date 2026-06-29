import type { Role } from "@/constants/roles";
import { ROLES, hasRole } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  description?: string;
  roles: Role[];
};

export const NAVIGATION: NavItem[] = [
  {
    href: ROUTES.dashboard,
    label: "Dashboard",
    icon: "🏠",
    description: "Resumen general",
    roles: [ROLES.ADMIN, ROLES.TECNICO, ROLES.USUARIO, ROLES.AUDITOR]
  },
  {
    href: ROUTES.myTickets,
    label: "Mis tickets",
    icon: "🎫",
    description: "Tickets que he creado",
    roles: [ROLES.USUARIO, ROLES.ADMIN]
  },
  {
    href: ROUTES.scanQr,
    label: "Escanear QR",
    icon: "📷",
    description: "Reportar incidente",
    roles: [ROLES.USUARIO, ROLES.ADMIN]
  },
  {
    href: ROUTES.technicianTickets,
    label: "Cola de tickets",
    icon: "🛠️",
    description: "Tickets a resolver",
    roles: [ROLES.TECNICO, ROLES.ADMIN]
  },
  {
    href: ROUTES.adminAssets,
    label: "Activos",
    icon: "📦",
    description: "Inventario y QR",
    roles: [ROLES.ADMIN]
  },
  {
    href: ROUTES.adminOrphans,
    label: "Huérfanos",
    icon: "🧩",
    description: "Activos sin asignar",
    roles: [ROLES.ADMIN]
  },
  {
    href: ROUTES.auditLogs,
    label: "Auditoría",
    icon: "📜",
    description: "Solo lectura",
    roles: [ROLES.AUDITOR, ROLES.ADMIN]
  },
  {
    href: ROUTES.reports,
    label: "Reportes",
    icon: "📊",
    description: "Métricas e insights",
    roles: [ROLES.AUDITOR, ROLES.ADMIN]
  }
];

export function navigationFor(roles: Role[] | undefined): NavItem[] {
  return NAVIGATION.filter((item) => hasRole(roles, item.roles));
}
