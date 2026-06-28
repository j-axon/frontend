"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { ROUTES } from "@/constants/routes";

const QUICK_LINKS = [
  {
    title: "Crear ticket",
    description: "Reporta una falla o solicita soporte técnico para un activo.",
    href: ROUTES.ticketsNew,
    cta: "Crear ticket",
  },
  {
    title: "Mis tickets",
    description: "Sigue el estado de las solicitudes que has creado.",
    href: ROUTES.myTickets,
    cta: "Ver mis tickets",
  },
  {
    title: "Cola del técnico",
    description: "Tickets asignados al equipo de soporte técnico.",
    href: ROUTES.technicianTickets,
    cta: "Abrir cola",
  },
  {
    title: "Gestión de activos",
    description: "Administra el inventario, asignaciones y códigos QR.",
    href: ROUTES.adminAssets,
    cta: "Ir a activos",
  },
  {
    title: "Activos huérfanos",
    description: "Equipos detectados por escaneo sin asignar.",
    href: ROUTES.adminAssetsOrphans,
    cta: "Revisar huérfanos",
  },
  {
    title: "Escanear red",
    description: "Descubre dispositivos activos en una subred.",
    href: ROUTES.network,
    cta: "Escanear",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const role = (user?.roles || ["USUARIO"])[0];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Bienvenido{user?.email ? `, ${user.email}` : ""}. Tu rol actual es{" "}
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
            {role}
          </span>
          .
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Accesos rápidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="flex-1 text-sm text-slate-600">{card.description}</p>
              <span className="text-sm font-medium text-slate-900 group-hover:underline">
                {card.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Estado del sistema
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Tickets abiertos" value="—" hint="requiere endpoint /tickets/stats" />
          <StatCard label="Activos totales" value="—" hint="requiere endpoint /assets/stats" />
          <StatCard label="Agentes desplegados" value="—" hint="requiere endpoint /agents/stats" />
          <StatCard label="Última sincronización" value="—" hint="sin telemetría reciente" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}