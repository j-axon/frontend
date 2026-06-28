import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.dashboard },
  { label: "Tickets", href: ROUTES.tickets },
  { label: "Mis tickets", href: ROUTES.myTickets },
  { label: "Técnico", href: ROUTES.technicianTickets },
  { label: "Activos", href: ROUTES.assets },
  { label: "Admin Activos", href: ROUTES.adminAssets },
  { label: "Huérfanos", href: ROUTES.adminAssetsOrphans },
  { label: "Reportes", href: ROUTES.reports }
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-slate-50 p-3 md:w-60 md:border-b-0 md:border-r md:p-4">
      <nav className="flex flex-wrap gap-2 md:grid">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-400"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
