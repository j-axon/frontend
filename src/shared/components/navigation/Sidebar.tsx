"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { PROTECTED_ROUTES } from "@/shared/constants/routes";
import { hasRoutePermission, type UserRole } from "@/shared/lib/auth/permissions";

interface NavItem {
  label: string;
  path: string;
}

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Panel", path: PROTECTED_ROUTES.DASHBOARD },
  { label: "Tickets", path: PROTECTED_ROUTES.TICKETS },
  { label: "Gestión de Activos", path: PROTECTED_ROUTES.ASSETS },
  { label: "Reportes y Auditoría", path: PROTECTED_ROUTES.REPORTS },
  { label: "Gestión de Usuarios", path: PROTECTED_ROUTES.USERS },
];

export const Sidebar: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const userRole = (user?.role as UserRole) || "USER";

  const alloweditems = ALL_NAV_ITEMS.filter((item) =>
    hasRoutePermission(userRole, item.path)
  );

  return (
    <aside className="fixed inset-y-0 left-0 w-64 border-r border-gray-200 bg-white flex flex-col justify-between z-20">
      <div className="flex flex-col flex-1 py-6 px-4">
        {/* Brand Header */}
        <div className="px-3 mb-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">J-AXON</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">
              {userRole}
            </span>
          </div>
        </div>

        {/* Dynamic Navigation */}
        <nav className="space-y-1 flex-1">
          {alloweditems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Session Action */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="mb-3 px-2">
          <p className="text-xs font-medium text-gray-900 truncate">{user?.email}</p>
        </div>
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center px-3 py-2 text-xs font-semibold text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};