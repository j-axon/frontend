"use client";

import * as React from "react";
import Link from "next/link";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { useLogout } from "@features/auth/hooks/useLogout";
import { useWebSocketNotifications } from "@features/notifications/hooks/useRealtimeNotifications";
import { Button } from "@shared/components/ui/Button";
import { Badge } from "@shared/components/ui/Badge";
import { ROLES } from "@/constants/roles";

export function Topbar() {
  const { user, isAuthenticated } = useCurrentUser();
  const logout = useLogout();
  const { notifications, connection } = useWebSocketNotifications();

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-bold text-white">
            ⚡
          </span>
          <span className="font-semibold text-fg">J-AXON</span>
        </Link>
        <Badge tone={connection === "OPEN" ? "success" : connection === "CONNECTING" ? "info" : "neutral"}>
          {connection === "OPEN" ? "En línea" : connection === "CONNECTING" ? "Conectando" : "Sin conexión"}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/notifications"
          className="relative inline-flex h-9 items-center justify-center rounded-md border border-border bg-bg-soft px-3 text-sm text-fg-soft hover:bg-muted"
          aria-label={`Notificaciones${unread ? ` (${unread} sin leer)` : ""}`}
        >
          🔔
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-fg">{user.fullName}</p>
              <p className="text-xs text-fg-soft">
                {user.roles.join(" · ")}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {initials(user.fullName)}
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              Salir
            </Button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-md border border-border bg-bg-soft px-3 py-2 text-sm hover:bg-muted"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

function initials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

// Helper unused (kept exported for future): role chip
export function CurrentRoleBadge({ role }: { role: keyof typeof ROLES }) {
  return <Badge tone="brand">{ROLES[role]}</Badge>;
}
