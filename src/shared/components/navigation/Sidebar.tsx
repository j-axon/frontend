import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";

export function Sidebar() {
  const navItems = [
    { href: ROUTES.dashboard, label: "Dashboard", roles: [ROLES.ADMIN, ROLES.TECHNICIAN, ROLES.USER, ROLES.AUDITOR] },
    { href: ROUTES.tickets, label: "Tickets", roles: [ROLES.ADMIN, ROLES.TECHNICIAN, ROLES.USER] },
    { href: ROUTES.assets, label: "Activos", roles: [ROLES.ADMIN, ROLES.TECHNICIAN, ROLES.USER] },
    { href: ROUTES.reports, label: "Reportes", roles: [ROLES.ADMIN, ROLES.TECHNICIAN] },
    { href: ROUTES.admin, label: "Administración", roles: [ROLES.ADMIN] },
    { href: ROUTES.auditor.root, label: "Auditoría", roles: [ROLES.AUDITOR] },
  ];

  return (
    <aside className="w-64 border-r bg-white p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}