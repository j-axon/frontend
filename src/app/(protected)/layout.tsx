"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { QueryProvider } from "@/components/common/query-provider";

const NAV_ITEMS = [
  { label: "Dashboard", href: ROUTES.dashboard },
  { label: "Tickets", href: ROUTES.tickets },
  { label: "Mis tickets", href: ROUTES.myTickets },
  { label: "Cola técnico", href: ROUTES.technicianTickets },
  { label: "Activos", href: ROUTES.assets },
  { label: "Admin activos", href: ROUTES.adminAssets },
  { label: "Huérfanos", href: ROUTES.adminAssetsOrphans },
  { label: "Reportes", href: ROUTES.reports },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`rounded-md border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      {label}
    </Link>
  );
}

function TopBar() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <strong className="text-lg font-semibold text-slate-900">J-AXON Panel</strong>
      <div className="flex items-center gap-3 text-sm text-slate-700">
        {user && (
          <span className="hidden md:inline">
            {user.email} · {(user.roles || []).join(", ") || "USUARIO"}
          </span>
        )}
        <button
          type="button"
          onClick={onLogout}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <TopBar />
        <div className="flex flex-1 flex-col md:flex-row">
          <aside className="w-full border-b border-slate-200 bg-white p-3 md:w-64 md:border-b-0 md:border-r md:p-4">
            <nav className="flex flex-wrap gap-2 md:grid">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
}