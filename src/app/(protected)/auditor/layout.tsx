"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLES } from "@/constants/roles";

const auditorLinks = [
  { href: "/auditor/audit-logs", label: "Registros de Auditoría" },
  { href: "/auditor/reports", label: "Reportes" },
];

export default function AuditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Panel de Auditoría
          </h1>
          <nav className="flex gap-4">
            {auditorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}