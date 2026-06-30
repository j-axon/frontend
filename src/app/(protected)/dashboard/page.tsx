"use client";

import * as React from "react";
import Link from "next/link";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { Card } from "@shared/components/ui/Card";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const { user } = useCurrentUser();

  if (!user) return null;

  const primary = user.roles[0];
  const greeting = greetingFor();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section>
        <p className="text-sm text-fg-soft">{greeting}</p>
        <h1 className="mt-1 text-3xl font-bold text-fg">
          Hola, {user.fullName.split(" ")[0] || user.username} 👋
        </h1>
        <p className="mt-1 text-fg-soft">
          Tu rol principal es{" "}
          <span className="font-semibold text-fg">{primary ?? "USUARIO"}</span>. Aquí tienes un resumen rápido.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          href={ROUTES.scanQr}
          icon="📷"
          title="Escanear QR"
          description="Reporta un incidente escaneando el activo."
          visible={[ROLES.USUARIO, ROLES.ADMIN].some((r) => user.roles.includes(r))}
        />
        <QuickAction
          href={ROUTES.myTickets}
          icon="🎫"
          title="Mis tickets"
          description="Sigue el estado de tus reportes."
          visible={[ROLES.USUARIO, ROLES.ADMIN].some((r) => user.roles.includes(r))}
        />
        <QuickAction
          href={ROUTES.technicianTickets}
          icon="🛠️"
          title="Cola de tickets"
          description="Resuelve tickets asignados o toma uno nuevo."
          visible={[ROLES.TECNICO, ROLES.ADMIN].some((r) => user.roles.includes(r))}
        />
        <QuickAction
          href={ROUTES.adminAssets}
          icon="📦"
          title="Gestión de activos"
          description="Crea, asigna y descarga QR."
          visible={user.roles.includes(ROLES.ADMIN)}
        />
        <QuickAction
          href={ROUTES.adminOrphans}
          icon="🧩"
          title="Activos huérfanos"
          description="Adopta activos sin asignar."
          visible={user.roles.includes(ROLES.ADMIN)}
        />
        <QuickAction
          href={ROUTES.reports}
          icon="📊"
          title="Reportes"
          description="Métricas y reportes solo lectura."
          visible={[ROLES.AUDITOR, ROLES.ADMIN].some((r) => user.roles.includes(r))}
        />
      </section>

      <Card title="Atajos" description="Tips para empezar">
        <ul className="ml-5 list-disc space-y-1 text-sm text-fg-soft">
          <li>Escanea el QR del activo directamente desde tu celular.</li>
          <li>Las notificaciones en tiempo real aparecen en la campana 🔔.</li>
          <li>Los técnicos pueden pedir un diagnóstico IA con un click.</li>
        </ul>
      </Card>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
  visible
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <Link
      href={href}
      className="group rounded-xl border border-border bg-bg-soft p-5 transition-colors hover:border-brand/60 hover:bg-muted"
    >
      <div className="mb-2 flex items-center gap-2 text-2xl" aria-hidden>
        {icon}
      </div>
      <h2 className="font-semibold text-fg group-hover:text-white">{title}</h2>
      <p className="mt-1 text-sm text-fg-soft">{description}</p>
    </Link>
  );
}

function greetingFor() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
}
