// src/shared/components/navigation/MobileMenu.tsx
"use client";

import React, { useState } from "react";
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

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const userRole = (user?.role as UserRole) || "USER";

  const allowedItems = ALL_NAV_ITEMS.filter((item) =>
    hasRoutePermission(userRole, item.path)
  );

  return (
    <div className="md:hidden w-full bg-white border-b border-gray-200 fixed top-0 left-0 h-16 px-4 flex items-center justify-between z-30">
      {/* Brand Logo Mobile */}
      <span className="text-lg font-bold tracking-tight text-gray-900">J-AXON</span>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Abrir menú"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Drawer Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-20 flex flex-col justify-between p-4 animate-fadeIn">
          <nav className="space-y-1">
            {allowedItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Session Footer */}
          <div className="border-t border-gray-100 pt-4 pb-6">
            <p className="text-xs text-gray-500 mb-3 px-2 truncate">{user?.email}</p>
            <button
              onClick={() => {
                setIsOpen(false);
                logoutUser();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-red-600 bg-red-50 rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};